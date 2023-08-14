const mongoose = require ("mongoose");

const connectdb =()=>{
    mongoose.connect(process.env.dB_URL).then((data)=>{
        console.log(`mongodb connected : ${data.connection.host}`);
        });
} ;
module.exports=connectdb;
