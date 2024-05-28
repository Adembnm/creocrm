import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Customer from "../models/customer.js";
import jwt from "jsonwebtoken";
import Order from "../models/order.js";
import Payment from "../models/payment.js";


//Get Customers
export const getCustomers = async (req, res) => {
  const page = req.query.page || 0;
  const search = req.query.search || '';
  const status = parseInt(req.query.status) || 0;
  const size = 8;
  let filter = {}
  try {
    // Filter
    if (search && search.length > 0) {
      filter.name = { $regex: `.*${search}.*`, $options: "i" }
    }
    if (status && status > 0) {
      filter.status = status
    } else {
      filter.status = { $ne: 6 }
    }
    // Get customers
    const customers = await Customer.find(filter, { history: 0 })
      .skip(page * size)
      .sort({ createdAt: -1 })
      .limit(size)
    // Count Customers
    const count = await Customer.countDocuments(filter)
    // Get Payments
    const payments = await Payment.find({ customer: { $in: customers.map(c => c._id) } }, { customer: 1, amount: 1, createdAt: 1 })

    // Response
    let response = customers.map(c => {
      let customer = c.toJSON()
      const customerPayments = payments.filter(p => p.customer.toString() === customer._id.toString())
      let totalPaid = customerPayments.reduce((a, b) => a + parseFloat(b.amount), 0)
      return {
        ...customer,
        paid: totalPaid,
      }
    })

    res.status(200)
      .header("x-pagination-count", Math.ceil(count / size))
      .header("x-pagination-total", count)
      .header("x-pagination-page", page)
      .json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


//Get Customers Statistics
export const getCustomersStatistics = async (req, res) => {
  try {
    // Count Total & Active Customers
    const total = await Customer.countDocuments();

    // Response
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//Get Customers List
export const getCustomersList = async (req, res) => {
  try {
    // Get Customers List 
    const customers = await Customer.find();
    // Response
    res.status(200).json(customers);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

//Get Customer
export const getCustomer = async (req, res) => {
  try {
    // Get Customer by Id
    const customer = await Customer.findById(req.params.id);

    // Get customer's orders
    const orders = await Order.find({ customer: customer._id });
    // Get customer's payments
    const payments = await Payment.find({ customer: customer._id });
    // Response
    const result = {
      ...customer.toObject(),
      paid: payments.reduce((acc, payment) => parseFloat(acc) + parseFloat(payment.amount), 0),

      orders,
      payments,
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

//Add Customer
export const addCustomer = async (req, res) => {
  const newCustomer = req.body;
  try {
    // Validation: Auth & Found
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const oldCustomer = await Customer.findOne({ email: newCustomer.email });
    if (oldCustomer) return res.status(400).json({ message: "Customer already exists" });
    // Customer Creation
    const customer = await Customer.create({
      ...newCustomer,
      history: [{
        date: new Date(),
        action: 'add',
        user: connectedUser._id,
      }]
    });

    // Response
    res.status(201).json(customer);
  } catch (error) {
    res.status(501).json({ message: error.message });
    console.log(error);
  }
}

//Edit Customer
export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  try {
    // Validation : Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const oldCustomer = await Customer.findById(id);
    if (!oldCustomer) return res.status(404).json({ message: "Customer not found" });
    // History Creation
    let updatedCustomer = {
      ...newCustomer,
      history: [...oldCustomer.history, {
        date: new Date(),
        action: 'edit',
        user: connectedUser._id,

      }]
    };

    // Customer Update
    const customer = await Customer.findByIdAndUpdate(id, updatedCustomer, { new: true });
    // Response
    res.status(201).json(customer);
  } catch (error) {
    res.status(501).json({ message: error.message });
    console.log(error);
  }
}

//Delete Customer
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    // Validation : Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    // Customer Delete
    // await Customer.findByIdAndDelete(id);
    await Customer.findByIdAndDelete(id);

    res.status(200).send(`Customer Deleted`);
  } catch (error) {
    res.status(501).json({ message: error.message });
    console.log(error);
  }
}


//Get Customer List Names
export const getCustomersListNames = async (req, res) => {
  try {
    // Get Customers List 
    const customers = await Customer.find({}).select('name').select('birthDay');
    // Response
    res.status(200).json(customers);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

//Get Unpaid Customers
export const getUnpaidCustomers = async (req, res) => {
  try {
    // Validation : Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    // Get Orders
    const orders = await Order.find().populate({ path: 'customer', select: 'name avatar' });
    const allPayments = await Payment.find({});
    let unpaidOrders = [];
    orders.forEach(order => {
      const orderPayments = allPayments.filter(paye => paye.order.toString() === order._id.toString());
      const totalOrderPayments = orderPayments && orderPayments !== undefined && orderPayments.length > 0 ? orderPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0) : 0;
      if (parseFloat(order.total) > parseFloat(totalOrderPayments)) {
        unpaidOrders.push({ ...order.toObject(), totalOrderPayments });
      }
    })
    // Get Customers
    let unpaidCustomers = [];
    unpaidOrders.forEach(order => {
      let unpaidCustomer = order.customer;
      const findCustomer = unpaidCustomers.find(customer => customer._id.toString() == unpaidCustomer._id.toString())
      if (!findCustomer?._id) {
        unpaidCustomers.push({ ...unpaidCustomer, unpaid: parseFloat(order.total) - parseFloat(order.totalOrderPayments) });
      } else {
        unpaidCustomers.map(cus => {
          if (cus._id === findCustomer._id) {
            cus.unpaid += parseFloat(order.total) - parseFloat(order.totalOrderPayments);
          }
        })
      }
    })
    // Response
    res.status(200).json(unpaidCustomers);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

