import Order from "../models/order.js";
import User from "../models/user.js";
import Customer from "../models/customer.js";
import jwt from "jsonwebtoken";
import Payment from "../models/payment.js";
import moment from "moment";
import order from "../models/order.js";

//Get Orders
export const getOrders = async (req, res) => {   
  const page = req.query.page || 0;
  const search = req.query.search || '';
  const status = req.query.status || 0;
  const size = 8;
  let filter = {}
  try {
      if (search && search.length > 0) {
        const customers = await Customer.find({ name: { $regex: `.*${search}.*`, $options: "i" } }).select({ _id: 1 });
        const customerIds = customers.map(customer => customer._id);
        if (customers && customers.length > 0) {
          filter.customer = { $in: customerIds };
        }
      }
      if (status && status > 0) {
        filter.status = status
      }
      const orders = await Order.find(filter)
                              .populate({ path: "customer", select: "name" })
                              .sort({ date: -1 })
                              .skip(page * size)
                              .limit(size)
      const count = await Order.countDocuments(filter)
      res.status(200)
          .header("x-pagination-count", Math.ceil(count / size))
          .header("x-pagination-total", count)
          .header("x-pagination-page", page)
          .json(orders);
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

//Get Order
export const getOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id).populate('customer')
                                              .populate('items.serviceId', 'name');
        const payments = await Payment.find({ order: id });
        const result = {
          ...order.toObject(),
          paid: payments.reduce((acc, payment) => parseFloat(acc) + parseFloat(payment.amount), 0)
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Add Order
export const addOrder = async (req, res) => {
  const newOrder = req.body;
  try {
    // Validation: Auth & Found
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(401).json({ message: "Unauthorized" });
    newOrder.createdBy = connectedUser._id;
    // Get Customer
    const customer = await Customer.findById(newOrder.customer);
    //Build Ref
    newOrder.ref = Date.now().toString();
    
    
  
    // Create Order
    const order = await Order.create(newOrder);

    // Save
    await customer.save()
    await order.save()
    

    // Response
    const orderResult = await Order.findById(order._id).populate('customer')
    res.status(201).json(orderResult);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Edit Order
export const editOrder = async (req, res) => {
  const newOrder = req.body;
  const { id } = req.params;
  try {
    // Validation: Auth & Found
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(401).json({ message: "Unauthorized" });
    // Get Old Order
    const oldOrder = await Order.findById(id);
    // Build History
    const updatedOrder = {
      ...newOrder,
      history: [...oldOrder.history, {
        date: new Date(),
        action: "edit",
        user: connectedUser._id,
      }],
    }
    const order = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Delete Order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // // Validation: Auth & Duplication
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    //Create Event
   
    // Archive Order
    await Order.findByIdAndUpdate(id, { status: 6, history: [...order.history, {
      date: new Date(),
      action: 'archive',
      user: connectedUser._id,
      prevStatus: order.status,
      newStatus: 6
  }] });
    //Response
    res.status(200).send(`Order Archived`);
  } catch (error) {
    
  }
}

//Accept Order


//Reject Order


//Get Customer orders
export const getCustomerOrders = async (req, res) => {
  const { id } = req.params;
  try {
    // Validation: Auth & Duplication
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    //Get Orders
    const orders = await Order.find({ customer: id, status: { $in: [2,4] } })
                              .select('ref tax total totalTaxed')
                              ;
    
    const payments = await Payment.find({ customer: id })

    //Response
    let response = orders.map(order => {
      let totalPaid = 0;
      payments.forEach(payment => {
        if (payment.order.toString() === order._id.toString()) {
          totalPaid = totalPaid + parseFloat(payment.amount)
        }
      })
      return {
        ...order._doc,
        paid: totalPaid,
      }
    })
    //Response
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Get Orders Statistics
export const getOrdersStatistics = async (req, res) => {
  try {
    // Validation: Auth & Duplication
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    //Get Orders
    // Count Total Orders
    const total = await Order.countDocuments();
    // Get current year
    const currentYear = moment().format('YYYY');
    const currentMonth = moment().add(1, "month").format('MM');
    let startDate = moment(`${currentYear}-01-01`);
    const endDate = moment(`${currentYear}-${currentMonth}-01`);
    let paymentsResult = [];
    let totalOrdersByMonth = [];
    let acceptedOrdersByMonth = [];
    let totalAllOrdersByMonth = [];
    let totalAcceptedOrdersByMonth = [];
    // While loop to get all years
    while (startDate.isBefore(endDate)) {
      const startSearch = moment(startDate).format("YYYY-MM-DD");
      const endSearch = moment(startDate).add(1, "month").format("YYYY-MM-DD");
      const filter = {
        date: {
          $gte: startSearch,
          $lte: endSearch,
        },
      };
      const countOrders = await Order.countDocuments(filter);
      const countAccepted = await Order.countDocuments({ ...filter, status: {$in: [2,4,5]} });
      const filtredAllOrders = await Order.find(filter)
      const totalMonthOrder = filtredAllOrders.reduce((acc, curr) => acc + parseFloat(curr.total), 0);
      const filtredAcceptedOrders = await Order.find({ ...filter, status: {$in: [2,4,5]} })
      const totalAcceptedMonthOrder = filtredAcceptedOrders.reduce((acc, curr) => acc + parseFloat(curr.total), 0);
      const payments = await Payment.find(filter)
      const totalPaid = payments.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

      paymentsResult.push(totalPaid);
      totalOrdersByMonth.push(countOrders);
      acceptedOrdersByMonth.push(countAccepted);
      startDate = moment(startDate).add(1, "month");
      totalAllOrdersByMonth.push(totalMonthOrder);
      totalAcceptedOrdersByMonth.push(totalAcceptedMonthOrder);
    }

    const currentMonthIndex = new Date().getMonth();
    const totalMonthPayments = paymentsResult[currentMonthIndex];
    const allAcceptedOrders = await Order.find({ status: {$in: [2,4,5]} });
    const allPayments = await Payment.find({});
    const allTotalPayments = allPayments.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalUnpaidAmount = allAcceptedOrders.reduce((acc, curr) => acc + parseFloat(curr.total), 0) - allTotalPayments;

    //Response
    res.status(200).json({
        total,
        payments: paymentsResult, 
        totalByMonth: totalOrdersByMonth,
        acceptedByMonth: acceptedOrdersByMonth,
        totalMonthPayments: totalMonthPayments,
        allTotalPayments: allTotalPayments,
        totalUnpaidAmount: totalUnpaidAmount,
        totalOrdersPricesByMonth: totalAllOrdersByMonth,
        totalAcceptedOrdersPricesByMonth: totalAcceptedOrdersByMonth,
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}