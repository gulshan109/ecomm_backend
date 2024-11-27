const {Router} = require("express");
const { registerUser, loginUser, logoutUser, updateUserPassword, updateUserprofile, forgotUserPassword, isLoggedIn } = require("../controller/user.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

const router = Router();
router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/logout" , logoutUser);
router.patch("/forgot" , forgotUserPassword);

// protected user route auth
router.get("/user-auth" , authenticate,(req,res)=>{
    res.status(200).send({ok:true});
});

// protected admin route auth
router.get("/admin-auth" , authenticate , authorize ,(req,res)=>{
    res.status(200).send({ok : true});
})

router.patch("/updateProfile" ,authenticate, updateUserprofile);
router.patch("/update-password" ,authenticate, updateUserPassword);

router.get("/isLogged", authenticate, isLoggedIn);

module.exports = router;