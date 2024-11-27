const { Schema , model } = require("mongoose");


const categoryModel = new Schema({
    name :{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase :true
    }
},{timestamps: true});

module.exports = model("Category" , categoryModel);


