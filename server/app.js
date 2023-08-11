const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors")
const connectdb = require ("./db/dbconnection")

dotenv.config();
const mongoose = require("mongoose");
connectdb();

const FindErrorMiddleware = require("./middlewares/error");
//middleware routes path variable ka kuch v rhkdo 
const productRoutes = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//middleware routes import
app.use(FindErrorMiddleware);
app.use("/api/v1", productRoutes);
// app.use("/api/v1",userRoutes);
app.use("/api/v1", userRouter);
const  PORT = process.env.PORT || 4000;
 app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});


