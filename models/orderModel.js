const mongoose = require("mongoose");
// schema   
const orderSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
    },
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['preparing','prepare', 'completed', 'cancelled'],
        default: 'preparing',
    }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
