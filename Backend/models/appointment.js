import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    date: { type: String, required: true },
    duration: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }); 

export default mongoose.model("Appointment", appointmentSchema);