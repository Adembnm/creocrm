import Payment from "../models/payment.js";
import User from "../models/user.js";
import Customer from "../models/customer.js";
import Order from "../models/order.js";
//import Project from "../models/project.js";

import jwt from "jsonwebtoken";

//Get Payments
export const getPayments = async (req, res) => {   
  const page = req.query.page || 0;
  const search = req.query.search || "";
  const date = req.query.date || 0;
  const size = 10;
  let filter = {}
  try {
        if (search && search.length > 0) {
            const customers = await Customer.find({ name: { $regex: `.*${search}.*`, $options: "i" } }).select({ _id: 1 });
            const customerIds = customers.map(customer => customer._id);
            if (customers && customers.length > 0) {
            filter.customer = { $in: customerIds };
            }
        }
        if (date && date !== "") {
            filter.date = { $regex: `.*${date}.*`, $options: "i" };
        }
        const payments = await Payment.find(filter)
                                .populate("customer")
                                .populate("order")
                                .sort({ date: -1 })
                                .skip(page * size)
                                .limit(size)
        const count = await Payment.countDocuments(filter)
        res.status(200)
            .header("x-pagination-count", Math.ceil(count / size))
            .header("x-pagination-total", count)
            .header("x-pagination-page", page)
            .json(payments);
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

//Get Payment
export const getPayment = async (req, res) => {
    const { id } = req.params
    try {
        const payment = await Payment.findById(id).populate("customer");
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//add Payment
export const addPayment = async (req, res) => {
    const newPayment = req.body;
    try {
        //Validation: Auth & Found
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const connectedUser = await User.findById(decoded.id);
        if (!connectedUser) return res.status(401).json({ message: "Unauthorized" });
        // Update order & Customer
        const customer = await Customer.findById(newPayment.customer);
        const order = await Order.findById(newPayment.order);
        //Check For Tax and Amount Value 
        if (parseFloat(order.total) - (parseFloat(order.paid) + parseFloat(newPayment.amount)) < 0) {
            return res.status(400).json({ message: "Not enough money to pay for this order" });
            //Close Project
        } else if (newPayment.closeProject) {
            
            // Check If Customer have another ORDERS
            const customerOrders = await Order.find({ customer: customer._id });
            if (customerOrders && customerOrders.find(order)) ;
        }
        //Save Order & Customer 
        await order.save();
        await customer.save();
        
        //Create Payment
        const payment = await Payment.create({...newPayment, createdBy: connectedUser._id});

        res.status(201).json(payment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Edit Payment
export const editPayment = async (req, res) => {
    const updatedPayment = req.body;
    const { id } = req.params;
    try {
      // Validation: Auth & Found
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const connectedUser = await User.findById(decoded.id);
      if (!connectedUser) return res.status(401).json({ message: "Unauthorized" });
      // Get Old Payment
      const payment = await Payment.findByIdAndUpdate(id, updatedPayment, { new: true });
      res.status(200).json(payment);
    } catch (error) {
      res.status(404).json({ message: error.message });
      console.log(error);
    }
  }

//Delete Payment
export const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
      // // Validation: Auth & Duplication
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const connectedUser = await User.findById(decoded.id);
      if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
      //Delete Payment
      await Payment.findByIdAndRemove(id);
      //Response
      res.status(200).send(`payment Deleted`);
    } catch (error) {
      
    }
  }
  
  