const mongoose= require('mongoose')
const colors = require('colors');
//function mongoDB connection
exports.connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDB database successfully ${mongoose.connection.host}`.bgCyan.white);
    }
    catch(error){
        console.error(`Error in MongoDB connection: ${error.message}`.red);
    }
}
