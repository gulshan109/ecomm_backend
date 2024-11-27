const  mongoose  = require("mongoose");
const { MONGODB } = require(".");

exports.connectDb = async()=>{
    await mongoose.connect(MONGODB);
    console.log("database connected..");
    
}