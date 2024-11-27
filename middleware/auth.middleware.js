const  Jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const USER_SCHEMA = require("../model/user.model");



exports.authenticate = async(req,res,next)=>{
    console.log(req.cookies);
    let cookie = req?.cookies?.cookie;
    if(!cookie){
        return res.status(400).json({ message : "please login to access the user data"})
    };

    const decodeToken = Jwt.verify(cookie, JWT_SECRET);
    let myUser = await USER_SCHEMA.findOne({_id : decodeToken.id});
    req.foundUser = myUser;
    next();
};

exports.authorize = async(req,res,next)=>{
    if(req.foundUser.role === "admin") next();
    else return res.status(401).json({message : "you are not authorize"})
};          