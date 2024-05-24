import Service from "../models/service.js";
import User from "../models/user.js";

import jwt from "jsonwebtoken";

//Get Services
export const getServices = async (req, res) => {   
  try {
      const services = await Service.find({}).sort({ createdAt: -1 })
      res.status(200).json(services);
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

//Get Service
export const getService = async (req, res) => {
    const { id } = req.params
    try {
        const service = await Service.findById(id)
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Add Service
export const addService = async (req, res) => {
  const newService = req.body;
  try {
    // Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    // Create Service
    const service = await Service.create(newService);
    // Create Event
    //createEvent({
      //user: connectedUser._id,
      //type: "add",
      //option: "Service",
      //message: `New Service Created by ${connectedUser.name}`,
    //})
    // Response
    res.status(201).json(service);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Edit Order
export const editService = async (req, res) => {
  const newService = req.body;
  try {
    // Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    // Update Service
    const service = await Service.findByIdAndUpdate(newService.id, newService, { new: true });
    // Create Event
    //createEvent({
      //user: connectedUser._id,
      //type: "edit",
      //option: "Service",
      //message: `Service Edited by ${connectedUser.name}`,
    //})
    // Response
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
}

//Delete Service
export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    //Validation: Auth
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    //Create Event
    //createEvent({
        //user: connectedUser._id,
        //type: "delete",
        //option: "Service",
        //message: `Service Deleted by ${connectedUser.name}`,
    //})
    //Delete Service
    await Service.findByIdAndRemove(id);
    //Response
    res.status(200).send(`Service Deleted`);
  } catch (error) {
    
  }
}
