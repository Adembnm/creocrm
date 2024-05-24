import Appointment from "../models/appointment.js";
import User from "../models/user.js";

import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";
import moment from "moment";

//Get Appointments
export const getAppointments = async (req, res) => {   
  try {
      const appointments = await Appointment.find({})
                                            .populate({
                                              path: "customer",
                                              select: "name avatar"
                                            })
                                            .sort({ createdAt: -1 })
      res.status(200).json(appointments);
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

//Get Appointment
export const getAppointment = async (req, res) => {
    const { id } = req.params
    try {
        const appointment = await Appointment.findById(id)
                                             .populate({path: 'customer', select: 'name'})
        res.status(200).json(appointment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Add Appointment
export const addAppointment = async (req, res) => {
  const newAppointment = req.body;
  try {
    // Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    // Create Appointment
    const appointment = await Appointment.create(newAppointment);
        // Response
    res.status(201).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Edit Appointment
export const editAppointment = async (req, res) => {
  const newAppointment = req.body;
  try {
    // Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    // Update Appointment
    const appointment = await Appointment.findByIdAndUpdate(newAppointment.id, newAppointment, { new: true });
    // Response
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Delete Appointment
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    //Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    
    //Delete Appointment
    await Appointment.findByIdAndRemove(id);
    //Response
    res.status(200).send(`Appointment Deleted`);
  } catch (error) {
    
  }
}

//Get List Customers
export const getListCutomers = async (req, res) => {
    try {
        const listCustomers = await Customer.find();
        res.status(200).json(listCustomers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Get Next Appointment
export const getNextAppointment = async (req, res) => {
    try {
        const currentDate = moment().format("YYYY-MM-DDTHH:mm");
        const appointments = await Appointment.find({ date: { $gte: currentDate } })
                                              .sort({ date: 1 })
                                              .populate({path: 'customer', select: 'name avatar'})
        const nextAppointment = appointments[0];
        res.status(200).json(nextAppointment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}