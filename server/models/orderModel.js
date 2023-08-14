const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippinginfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref:"product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref:"product",
    required: true,
  },
  paymentInfo:{
    id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },

  },
  paidAt: {
    required:true,
    type: Date,
    required: true,
  },
  itemsPrice:{
    required:true,
    type:Number,
    default:0
  },
  taxPrice:{
    required:true,
    type:Number,
    default:0
  },
  shippingPrice:{
    required:true,
    type:Number,
    default:0
  },
  totalPrice:{
    required:true,
    type:Number,
    default:0
  },
  orderStatus:{
    required:true,
    type:String,
    default:"processing"
  },
  deliverAt:Date,
  createAt:{
    type:Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Order",orderSchema);