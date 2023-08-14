const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors")
const connectdb = require ("./db/dbconnection")

// uncaught exception 
process.on("uncaughtException",(err)=>{
console.log(`error:${err.message}`);
console.log(`shutting down rhe server due to uncaught Exception`);
process.exit(1);
})


dotenv.config();
const mongoose = require("mongoose");
connectdb();

const FindErrorMiddleware = require("./middlewares/error");
//middleware routes path variable ka kuch v rhkdo 
const productRoutes = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


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


