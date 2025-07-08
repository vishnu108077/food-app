const mongoose = require('mongoose')

// schema
const foodSchema = new mongoose.Schema({
    foods:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',}
        ],
        payment:{},
        buyer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
}, { timestamps: true })

module.exports=mongoose.model('food',foodSchema)