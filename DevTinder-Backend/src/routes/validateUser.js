const express=require("express");
const router=express.Router();
const validation=require('../utils/validate');
const User=require("../models/user");
const bcrypt=require("bcrypt");

//Sign In

router.post("/user",async (req,res)=>{
  try{ 
    validation(req);
    const {firstName,lastName,EmailId,Password,Age,Gender,Skills,Bio}=req.body;
   const hashedpswrd=await bcrypt.hash(Password,4);
   const user1=new User({
    firstName,
    lastName,Bio,
    Password:hashedpswrd,
    EmailId,
    Age,Gender,Skills,
   });
   await user1.save();
   res.send("succesfully added new user");
}
catch(err){
        res.status(400).send("Error occured !"+ err.message);
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
        throw new Error("EmailId is not registered  please login!");
    }
    const Match=await user.validatePassword(Password);
    if(!Match)
    {
        throw new Error("Password is wrong !");
    }
    const token=await user.isjwt();
   res.cookie("token", token,
    {expires:new Date(Date.now()+8*3600000)});   // 👈 important when using multiple port);


    res.send(user);
  } catch (err) {
    res.status(400).send("Failed :" + err.message);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
 res.cookie("token",null,{
  expires:new Date(Date.now()),
 });
  res.send("Logout successful");
});



module.exports=router;