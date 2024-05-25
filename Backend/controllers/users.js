import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


//Get Users
export const getUsers = async (req, res) => {
  const page = req.query.page || 0;
  const search = req.query.search || '';
  const role = parseInt(req.query.role) || 0;
  const size = 8;
  let filter = {}
  try {
      // Filter
      if (search && search.length > 0) {
        filter.name = { $regex: `.*${search}.*`, $options: "i" }
      }
      if (role && role > 0) {
        filter.role = role
      }
      // Get users  
      const users = await User.find(filter, {password: 0})
                              .sort({ createdAt: -1 })
                              .skip(page * size)
                              .limit(size)
      // Count Users
      const count = await User.countDocuments(filter)
      // Response
      res.status(200)
          .header("x-pagination-count", Math.ceil(count / size))
          .header("x-pagination-total", count)
          .header("x-pagination-page", page)
          .json(users);
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

//Get user
export const getUser = async (req, res) => {
  const { id } = req.params
  try {
      // Get user by ID
      const user = await User.findById(id, {password: 0});
      // Response
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

//Add user
export const addUser = async (req, res) => {
  const newUser = req.body;
  try {
    // Validation : Auth & Duplicate email
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const oldUser = await User.findOne({ email: newUser.email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    // Hash password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    // Create user
    const createdUser = { ...newUser, password: hashedPassword };
    await User.create(createdUser);
    // Select User
    const user = await User.findOne({ email: newUser.email }, {password: 0});
    // Response
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Edit user
export const editUser = async (req, res) => {
  let hashedPassword = null;
  const { id } = req.params;
  const newUser = req.body;
  try {
    // Validation : Auth & email
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const oldUser = await User.findOne({ email: newUser.email });
    if (!oldUser) return res.status(400).json({ message: "User not exists" });
    // check for new email
    if (oldUser.email !== newUser.email) {
      const checkMail = await User.findOne({ email: newUser.email });
      if (checkMail) return res.status(400).json({ message: "User already exists" });
    }
    // Check for new password
    if (newUser.password && newUser.password.length > 0) {
      hashedPassword = await bcrypt.hash(newUser.password, 10);
    } else {
      hashedPassword = oldUser.password;
    }
    // Update user
    const updatedUser = { ...newUser, password: hashedPassword };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    // Select User
    const user = await User.findById(id, {password: 0});
    
    // Response
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}

//Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Validation : Auth & Found user
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connectedUser = await User.findById(decoded.id);
    if (!connectedUser) return res.status(404).json({ message: "Unauthorized" });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Delete user
    await User.findByIdAndRemove(id);
    
    
    // Response
    res.status(200).send(`User Deleted`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Get statistics
export const getStatistics = async (req, res) => {
  try {
    // Get statistics- Count total and active users
    const totalCount = await User.countDocuments();
    const actifCount = await User.countDocuments({ is_actif: true });
    // Response
    res.status(200).json({ totalCount, actifCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

