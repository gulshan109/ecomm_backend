const {Router} = require("express");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const formidable = require("express-formidable");

const { createProductController, getAllProducts, getOneProduct, getPhoto, deleteProduct, updateProduct } = require("../controller/products.controller");
const router = Router();

router.post("/createProduct/:cookie" , authenticate, authorize ,formidable() ,createProductController);

// update product router
router.put("/updateProduct/:id" , authenticate, authorize ,formidable() ,updateProduct);

// get product router
router.get("/getAll" , getAllProducts);
router.get("/getOne/:id" , getOneProduct);

// get photo router
router.get("/getPhoto/:id" , getPhoto);
// delete product router
router.delete("/deleteProduct/:id" , authenticate, authorize , deleteProduct);

module.exports = router;