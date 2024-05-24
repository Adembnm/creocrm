import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
    date: { type: String, required: true },
    amount: String,
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    paymentMethod: Number,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    mode: String,
}, { timestamps: true }); 

export default mongoose.model("Payment", PaymentSchema);