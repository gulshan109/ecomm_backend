const {Router} = require("express");
const { createCategory, updateCategory, findAllCategory, findOneCategory, deleteCategory } = require("../controller/category.controller.js");
const { authenticate, authorize } = require("../middleware/auth.middleware.js");

const router = Router();

// create category route 
router.post("/createCategory/:cookie" ,authenticate, authorize, createCategory , ()=>{
    console.log("category created");
});

// update category route
router.put("/updateCategory/:id/:cookie", authenticate , authorize , updateCategory);

// get all category route

router.get("/findAllCategory/:cookie" , authenticate , authorize , findAllCategory)

// Find One category route

router.get("/oneCategory/:id/:cookie" , authenticate , authorize , findOneCategory);

// delete category route
router.delete("/deleteCategory/:id/:cookie" , authenticate ,authorize , deleteCategory);
module.exports = router;