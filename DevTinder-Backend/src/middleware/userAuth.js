 const User=require("../models/user");
 const jwt=require("jsonwebtoken");
 const userAuth=async(req,res,next)=>{
 try{  
   console.log("userauth triggered !"); 
    const {token}=req.cookies;
    console.log("cookies",req.cookies);
    console.log(token);
    if(!token)
    {
        throw new Error("please login ur account");
    }
    const DecodeMsg=jwt.verify(token,"Manju1612");
    const{_id}=DecodeMsg;
    const user=await User.findById(_id);
    req.user=user;
   // console.log(req.headers.cookie);
    next();
    console.log("userauth passed!")
 }
 catch(err)
 {
    res.status(400).send("Failed  :"+err.message);
 }
 }
 module.exports=userAuth;