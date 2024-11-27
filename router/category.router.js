const {Router} = require("express");
const { createCategory, updateCategory, findAllCategory, findOneCategory, deleteCategory } = require("../controller/category.controller.js");
const { authenticate, authorize } = require("../middleware/auth.middleware.js");

const router = Router();

// create category route 
router.post("/createCategory" ,authenticate, authorize, createCategory , ()=>{
    console.log("category created");
});

// update category route
router.put("/updateCategory/:id", authenticate , authorize , updateCategory);

// get all category route

router.get("/findAllCategory" , authenticate , authorize , findAllCategory)

// Find One category route

router.get("/oneCategory/:id" , authenticate , authorize , findOneCategory);

// delete category route
router.delete("/deleteCategory/:id" , authenticate ,authorize , deleteCategory);
module.exports = router;