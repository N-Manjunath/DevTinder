 const User=require("../models/user");
 const jwt=require("jsonwebtoken");
 const userAuth=async(req,res,next)=>{
 try{   
    const {token}=req.cookies;
    if(!token)
    {
        throw new Error("The JWT is not generated");
    }
// console.log(req.cookies);
   // console.log(token);
    const DecodeMsg=jwt.verify(token,"Manju1612");
    const{_id}=DecodeMsg;
    const user=await User.findById(_id);
    req.user=user;
    next();
 }
 catch(err)
 {
    res.status(400).send("Failed :");
 }
 }
 module.exports=userAuth;