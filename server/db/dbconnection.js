const mongoose = require ("mongoose");

const connectdb =()=>{
    mongoose.connect(process.env.dB_URL).then((data)=>{
        console.log(`mongodb connected : ${data.connection.host}`);
        }).catch((err)=>{
            console.error("MongoDB connection error:", err);
        })
} 


  

module.exports=connectdb;
