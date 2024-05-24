import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    date: { type: String, required: true },
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    //project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    //status: Number,
    tax: {type: Boolean, default: true},
    discount: {type: Number, default: 0},
    total: {type: Number, default: 0},
    totalHT: {type: Number, default: 0},
    totalTax: {type: Number, default: 0},
    totalTTC: {type: Number, default: 0},
    items: [
        {
            serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
            //productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            name: String,
            quantity: Number,
            discount: Number,
            price: Number,
            total: Number,
            tax: Number,
            totalTax: Number,
            totalTaxed: Number,
        }
    ],
    history: [
        {
            date: Date,
            action: String,
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            prevStatus: Number,
            nextStatus: Number,
        }
    ],
    ref: Number,
    qrCode: String,
    rejectionReason: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }); 

export default mongoose.model("Order", OrderSchema);