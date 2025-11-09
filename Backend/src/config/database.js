require("dotenv").config();
const mongoose=require("mongoose");
const DB_URL=process.env.MONGO_URL;
const connectDB=async()=>
{
await mongoose.connect(DB_URL);
};
module.exports=connectDB;

