const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");

// post order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippinginfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippinginfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
  });
  res.status(201).json({ success: true, order });
});

//get single order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) =>{

    const order = await Order.findById(req.params.id).populate("user","name email");
    if (!order) {
        return next(new ErrorHandler("order not found with id", 404));
      }
      res.status(200).json({ success: true, order });
});

//get logged in user order

exports.myOrders = catchAsyncErrors(async (req, res, next) =>{
    const orders = await Order.find({user:req.user._id});

      res.status(200).json({ success: true, orders });
});

  