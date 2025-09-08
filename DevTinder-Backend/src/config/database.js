const mongoose=require("mongoose");
const DB_URL="mongodb+srv://manjunathmanju200727:Manju%401612@cluster0.zv8yclw.mongodb.net/DevTinder";
const connectDB=async()=>
{
await mongoose.connect(DB_URL);
};
module.exports=connectDB;

