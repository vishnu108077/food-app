const mongoose = require("mongoose");

//schema

const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    imageURL:{
        type:String
    },
    foods:{
        type:Array
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true,
    },
    isopen:{
        type:Boolean,
        default:true
    },
    logoURL:{
        type:String
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    code:{
        type:String,
    },
    coords:{
        id:{
            type:String,
        },
        latitude:{type:Number},
        latitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    }
}, { timestamps: true });

//export
module.exports = mongoose.model("restaurant", restaurantSchema);