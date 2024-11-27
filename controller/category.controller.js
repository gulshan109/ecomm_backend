const category_Model = require("../model/catagory.model.js");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const { errorHandler } = require("../utils/errorHandler.js");

exports.createCategory = asyncHandler(async (req, res) => {
  let { name } = req.body;
  let existingCategory = await category_Model.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }
  let newCategory = await new category_Model({
    name,
    slug: slugify(name),
  }).save();
  res.json({
    success: true,
    message: "Category created successfully",
    data: newCategory,
  });
});

// update category collection

exports.updateCategory = asyncHandler(async (req, res) => {
  let { name } = req.body;
  let { id } = req.params;
  const category = await category_Model.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  res
    .status(200)
    .json({
      success: true,
      message: "category update successfully",
      data: category,
    });
});

exports.findAllCategory = asyncHandler(async (req, res, next) => {
  let allCategory = await category_Model.find();
  if (allCategory === 0) {
    return next(new errorHandler("no category found", 404));
  }
  res
    .status(200)
    .json({
      success: true,
      message: "get all category successfully",
      data: allCategory,
    });
});

// find one category controller
exports.findOneCategory = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  let category = await category_Model.findById(id);
  if (!category) {
    return next(new errorHandler("category not found", 404));
  }
  res
    .status(200)
    .json({
      success: true,
      message: "get category successfully",
      data: category,
    });
});

// delete category controller

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    let {id} = req.params;
    await category_Model.findByIdAndDelete(id);
    res.status(201).json({success:true , message : "category deleted successfully"});

});
