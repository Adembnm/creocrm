import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    website: String,
    address: String,
    city: String,
    avatar: String,
    status: Number,
    rate: Number,
    satisfaction: Number,
    notes: String,
    birthDay: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    history: [
        {
            date: Date,
            action: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            prevStatus: Number,
            nextStatus: Number,
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: Number,
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);