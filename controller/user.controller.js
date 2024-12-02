const asyncHandler = require("express-async-handler");
const USER_SCHEMA = require("../model/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const { JWT_SECRET } = require("../config");
const {JWT}  = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");


exports.registerUser = asyncHandler(async (req, res, next) => {
  let { name, email, password, phone, address, answer, role } = req.body;

  let existingUser = await USER_SCHEMA.findOne({ email });
  if (existingUser) {
    return  res.status(404).send({
        success: false,
        message: "Email already exist",
      });
  }
  let user = await USER_SCHEMA.create({
    name,
    email,
    phone,
    address,
    password,
    answer,
  });

  res.status(201)
    .json({
      success: true,
      message: "user createded successfully...",
      data: user,
    });
});

// login user controller
exports.loginUser = asyncHandler(async(req,res,next)=>{
    let {email,password}=req.body;

    // validation
    if(!email || !password){
        // return next(new ErrorHandler("please enter email and password",401));
        return res.status(400).json({success : false , message : "please enter email and password"});
    };
    // check user

    let user = await USER_SCHEMA.findOne({email});
    if(!user){
        res.status(401).json({success : false , message : "email is not registered" });
    }
    const match = await user.comparePassword(password);
    if(!match){
        return res.status(400).send({
            success: false,
            message: "Invalid Password",
          });
    };
    let token = generateToken(user.id);
    console.log(token);

    res.cookie("cookie" , token , {
        httpOnly:true,
        maxAge : 1*60*60*1000,
    });

    res.status(200).json({
        success : true ,
         message  :"user login successfully" ,
         existingUser :{
            _id : user.id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            address : user.address,
            role : user.role
         },
         token
    });
});

exports.logoutUser = async(req,res)=>{
    res.clearCookie("cookie" ,"" ,{
        maxAge : Date.now(),
        sameSite : "1ax",
        secure :false,
        path :"/"
    });
    res.status(201).json({success : true , message : "logout user successfully"})
};

// update user profile 

exports.updateUserprofile = asyncHandler(async(req,res)=>{
    let id = req.foundUser._id;
    let {name , email} = req.body;
    console.log(req.body);
    

    let updateUser = await USER_SCHEMA.updateOne({_id : id} ,{$set :{name,email}});
    res.status(201).json({
        success  :true ,
         message : "user profle  updated successfully" ,
          data : updateUser});

})

// forgot password controller

exports.forgotUserPassword  = asyncHandler(async(req,res,next)=>{
    let {email , answer , newPassword} = req.body;
    const user = await USER_SCHEMA.findOne({email , answer});
    if(!user){
        return res.status(404).json({success : false , message : "worng email and answer"})
    };
    // await USER_SCHEMA.findByIdAndUpdate(user._id , {password :hashed });
    user.password = newPassword;
    await user.save();

    res.status(200).json({success : true , message : "password reset successfully"})
});

// update password function

exports.updateUserPassword = asyncHandler(async(req,res)=>{
    let id = req.foundUser._id;
    let findUser = await USER_SCHEMA.findOne({_id: id}).select("+password")

    let {oldPassword , newPassword} = req.body;

    if(!oldPassword , !newPassword){
        return res.status(400).json({success:false , message :"old password and new password is required"})
    }
    let isPasswordMatch = await findUser.comparePassword(oldPassword);
    if(!isPasswordMatch){
        return res.status(401).json({success:false , message:"oldpassword is not match"})
    };
    findUser.password = newPassword;
    await findUser.save();
    res.status(200).json({success : true , message :"user password is updated successfully"})

});

exports.isLoggedIn = async (req, res) => {
    let user = await USER_SCHEMA.findOne({ _id: req?.foundUser?._id });
  
    if (!user) return res.status(404).json({ success: false, message: "no user details found" });
  
    res.status(200).json({ success: true });
  };
