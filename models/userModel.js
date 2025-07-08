const mongoose = require("mongoose");

//schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    // usertype: {
    //     type: String,
    //     required: [true, 'User type is required'],
    //     default: 'client',
    //     enum: ['client', 'admin', 'vendor', 'driver'],
    // },
    profile: {
        type: String,
        default: 'https://res.cloudinary.com/dxqj1k6zv/image/upload/v1735681234/food-app/profile.png',
    },
    answer:{
        type :String,
        required:[true,"Answer is required"]
    }
}, { timestamps: true });

//export
module.exports = mongoose.model("User", userSchema);