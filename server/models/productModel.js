const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please fill this field"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "please fill this field"],
  },
  price: {
    type: Number,
    require: [true, "please fill this field"],
    maxLength: [8, "price cant exceed 8 no."]
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true
      },
      url: {
        type: String,
        require: true
      }
    }
  ],
  category: {
    type: String,
    require: [true, "please enter product category"],
  },
  stock: {
    type: Number,
    require: [true, "please enter product Number"],
    maxLength: [4, "price cant exceed 4 no."],
    default:1
  },
  numOfReview: {
    type: Number,
    default:0
  },
  reviews: [
    {
       name:{
        type: String,
        require:true
       },
       rating: {
        type: Number,
        require:true
      },
      comment:{
        type:String,
        require:true
      }
      }
  ],
  createAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Product",productSchema);   
