const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors")
const connectdb = require ("./db/dbconnection")

dotenv.config();
const mongoose = require("mongoose");
connectdb();


//middleware routes path variable ka kuch v rhkdo 
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());


//middleware routes import
app.use("/api/v1",userRoutes);
app.use("/api/v1", productRoutes);


const  PORT = process.env.PORT || 4000;
 app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});


