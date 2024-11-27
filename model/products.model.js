const { Schema, default: mongoose, model } = require("mongoose");


const productSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    slug:{
        type :String,
        required : true
    },
    description:{
        type :String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category:{
        type: mongoose.ObjectId,
        ref :'Category',
        require :true
    },
    quantity:{
        type: Number,
        required: true
    },
    photo : {
        data: Buffer,
        contentType : String
    },
    shipping:{
        type:Boolean,
    }
},{timestamps: true});

module.exports = model("Products" ,productSchema);