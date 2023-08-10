const Product = require("../models/productModel");
const catchAsyncErrors = require ("../middlewares/catchAyscError");
const ApiFeatures = require ("../utils/apifeatures");
//yahan create product bna k fr route mein import krna

// post all products
exports.createProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// get all products
exports.getAllProducts = async (req, res) => {

  const resultPerPage = 10;
 const productCount = await Product.countDocuments();

 const apiFeatures = new ApiFeatures(Product.find(),req.query); 
 apiFeatures.search().filter().pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products });
};

// get only single products
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product ,productCount});
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// put all update Admin products
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "not found product" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModifiy: false,
  });
  res.status(200).json({ success: true, product });
};

// delete all delete Admin products
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product has been deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

