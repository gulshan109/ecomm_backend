const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    password :{
        type : String,
        required : true,
        trim : true,
    },
    phone : {
        type : String,
    },
    address  :{
        type : {},
    },
    answer : {
        type : String,
    },
    role : {
        type : String,
        enum : ["user" , "admin"],
        default :"user",
    }
} ,
{timestamps : true});

// password hashing
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        next();
    };
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password ,salt);
    this.password = hashedPassword
});

// password verification
userSchema.methods.comparePassword  = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
};

module.exports = mongoose.model("users" , userSchema);