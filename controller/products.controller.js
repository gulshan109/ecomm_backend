const asyncHandler = require("express-async-handler");
const product_Schema = require("../model/products.model");
const fs = require("fs");
const { default: slugify } = require("slugify");

// create products controller

exports.createProductController = asyncHandler(async (req, res, next) => {
  let { name, slug, description, price, category, quantity, shipping } =
    req.fields;
  let { photo } = req.files;
  if (photo && photo.size > 1000000) {
    res.status(501).json({
       success: false, message: "photo size less then 1mb" 
      });
  }
  

  const products = new product_Schema({ ...req.fields, slug: slugify(name) });
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  await products.save();
  res.status(201).json({
    success: true,
    message: "Products created successfully",
    data: products,
  });
});

// update product controller

exports.updateProduct = asyncHandler(async (req, res, next) => {
  let { name, slug, description, price, category, quantity, shipping } =
    req.fields;
  let { photo } = req.files;
  if (photo && photo.size > 1000000) {
    res
      .status(501)
      .json({ success: false, message: "photo size less then 1mb" });
  }
  const products = await product_Schema.findByIdAndUpdate(
    req.params.id,
    { ...req.fields, slug: slugify(name) },
    { new: true }
  );
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  res.status(201).json({
    success: true,
    message: "product updated successfully",
    data: products,
  });
});

// get all products controller

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  let Products = await product_Schema
    .find({})
    .populate("category")
    .select("-photo")
    .limit(12)
    .sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    counTotal: Products.length,
    message: "get all products successfully",
    data: Products,
  });
});

// get one product controller

exports.getOneProduct = asyncHandler(async (req, res) => {
  let product = await product_Schema
    .findById(req.params.id)
    .populate("category")
    .select("-photo")
    .populate("category");
  res.status(201).json({
    success: true,
    message: "get one product successfully",
    data: product,
  });
});

// get photo controller

exports.getPhoto = asyncHandler(async (req, res) => {
  let product = await product_Schema.findById(req.params.id).select("photo");
  if (!product || product.photo.length === 0) {
    return res.status(404).json({ success: false, message: "photo not found" });
  }
  if (product.photo.data) {
    res.set("content-type", product.photo.contentType);
    return res.status(201).send(product.photo.data);
  }
});

// delete product controller

exports.deleteProduct = asyncHandler(async (req, res) => {
  let product = await product_Schema.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    message: "product deleted successfully",
    data: product,
  });
});
