const express=require("express");
const router=express.Router();
const User=require("../models/user");
const userAuth=require("../middleware/userAuth");

// get user
router.get("/user",userAuth,async (req,res)=>
{
  try{
    const user=req.user;
   res.send(user)
  }
  catch(err)
  {
    res.status(400).send(err.message);
  }
})

//Update

router.patch('/user/edit',userAuth,async(req,res)=>
{
    try
    {
    const user=req.user;
    const userID=user._id;
    const data= req.body;
        const AllowedUpdates=['firstName','lastName','Gender','Skills','Age','Password','Bio','PhotoUrl'];
    const updates=Object.keys(data).every((k)=>AllowedUpdates.includes(k));
    if(!updates)
    {
        throw new Error("This updation is not valid !");
    }
     if(data.Password)
        {
            data.Password=await bcrypt.hash(data.Password,4)
        }
const updatedUser= await User.findByIdAndUpdate(userID,data,{runValidators: true,new:true});
    //console.log(datainfo);
    res.send(updatedUser);
}   catch(err){
        res.status(400).send("ERROR :"+err.message);
    } 
})

module.exports=router;