const express=require("express");
const router=express.Router();
const validation=require('../utils/validate');
const User=require("../models/user");
const bcrypt=require("bcrypt");

//Sign In

router.post("/signup",async (req,res)=>{
  try{ 
    validation(req);
    const {firstName,lastName,EmailId,Password}=req.body;
   const hashedpswrd=await bcrypt.hash(Password,4);
   const user1=new User({
    firstName,
    lastName,
    Password:hashedpswrd,
    EmailId
   });
   const saveduser=await user1.save();
   const token=await saveduser.isjwt();
  //  res.cookie("token", token,
  //   {expires:new Date(Date.now()+8*3600000)});
    //console.log(user1);
    //console.log(saveduser); 

    res.cookie("token", token, {
  httpOnly: true,
  secure: true, // true because Render + Vercel use HTTPS
  sameSite: "none", // allows cookie sharing across different domains
  expires: new Date(Date.now() + 8 * 3600000),
});
    res.json({saveduser,token});
  }
catch(err){
        return res.status(400).send(""+ err.message);
    }

})


//login In
router.post("/login",async (req,res)=>
{
    try{
    const{EmailId,Password}=req.body;
    const user= await User.findOne({EmailId});
    if(!user)
    {
        return res.status(401).send("Invalid Email or Password");
    }
    const Match=await user.validatePassword(Password);
    if(!Match)
    {
       return res.status(401).send("Invalid Email or Password");
    }
    const token=await user.isjwt();
  //  res.cookie("token", token,
  //   {expires:new Date(Date.now()+8*3600000)});   // 👈 important when using multiple port);


    res.cookie("token", token, {
  httpOnly: true,
  secure: true, // true because Render + Vercel use HTTPS
  sameSite: "none",
   domain: ".onrender.com", // allows cookie sharing across different domains
  expires: new Date(Date.now() + 8 * 3600000),
});


    res.json({user,token});
  } catch (err) {
   return res.status(400).send("Failed :" + err.message);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
//  res.cookie("token",null,{
//   expires:new Date(Date.now()),
//  });

res.cookie("token", null, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
   domain: ".onrender.com",
  expires: new Date(Date.now()),
});

  res.send("Logout successful");
});



module.exports=router;