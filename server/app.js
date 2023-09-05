const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const cors = require("cors")
const connectdb = require ("./db/dbconnection")
const cloudinary = require("cloudinary")
// uncaught exception 
process.on("uncaughtException",(err)=>{
console.log(`error:${err.message}`);
console.log(`shutting down your server due to uncaught Exception`);
process.exit(1);
})


dotenv.config();
connectdb();

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

// all path routes
const FindErrorMiddleware = require("./middlewares/error");
const productRoutes = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//middleware routes import
app.use(FindErrorMiddleware);
app.use("/api/v1", productRoutes);
app.use("/api/v1",orderRoutes);
app.use("/api/v1", userRouter);
const  PORT = process.env.PORT || 4000;
const server= app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});


process.on("unhandledRejection",(err)=>{
  console.log(`Error : ${err.message}`);
  console.log(`shutting down server due to unhandled promise Rejection`);
  server.close(()=>{
    process.exit(1);
  });
});


