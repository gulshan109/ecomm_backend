const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.generateToken = (id)=>{
    return JWT.sign({id} , JWT_SECRET , {
        expiresIn : "7d"
    })
};