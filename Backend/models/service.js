import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    unit: String,
    price: Number,
    tax: Number,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }); 

export default mongoose.model("Service", serviceSchema);