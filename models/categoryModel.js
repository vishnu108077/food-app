const mongoose = require("mongoose");

//schema

const categorySchema = new mongoose.Schema({
   title:{
    type:String,
    required:[true,"title is required"]
   },
   imageUrl:{
    type:String,
    default:'https://marketplace.canva.com/EAFpeiTrl4c/2/0/1600w/canva-abstract-chef-cooking-restaurant-free-logo-a1RYzvS1EFo.jpg'
   }
}, { timestamps: true });

//export
module.exports = mongoose.model("category", categorySchema);