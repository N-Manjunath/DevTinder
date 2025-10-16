 const User=require("../models/user");
 const jwt=require("jsonwebtoken");
 const userAuth=async(req,res,next)=>{
 try{  
  const token = req.cookies.token; // ✅ read token from cookies

if (!token) {
  return res.status(401).send("Please login"); // ✅ fail gracefully
}

const decoded = jwt.verify(token, process.env.JWT_SECRET); // use env secret
const user = await User.findById(decoded._id);
if (!user) return res.status(401).send("User not found");

req.user = user; // attach user to request
next();
    console.log("userauth passed!")
 }
 catch(err)
 {
    res.status(400).send("Failed  :"+err.message);
 }
 }
 module.exports=userAuth;