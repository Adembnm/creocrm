import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: Number, required: true },
  avatar: String,
  is_actif: { type: Boolean, default: true },
}, { timestamps: true }); 

export default mongoose.model("User", userSchema);