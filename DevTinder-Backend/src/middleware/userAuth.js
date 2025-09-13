 const User=require("../models/user");
 const jwt=require("jsonwebtoken");
 const userAuth=async(req,res,next)=>{
 try{   
    const {token}=req.cookies;
    if(!token)
    {
        throw new Error("please login");
    }
    const DecodeMsg=jwt.verify(token,"Manju1612");
    const{_id}=DecodeMsg;
    const user=await User.findById(_id);
    req.user=user;
   // console.log(req.headers.cookie);
    next();
 }
 catch(err)
 {
    res.status(400).send("Failed :"+err.message);
 }
 }
 module.exports=userAuth;