const express=require("express");
const router=express.Router();
const User=require("../models/user");
const userAuth=require("../middleware/userAuth");
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

router.patch('/user/:userID',async(req,res)=>
{
    const userID=req.params?.userID;
    const data= req.body;
    try{
        const AllowedUpdates=['firstName','lastName','Gender','Skills','Age','Password'];
    const updates=Object.keys(data).every((k)=>AllowedUpdates.includes(k));
    if(!updates)
    {
        res.status(400).send("something went wrong"+err.message);
    }
     if(data.Password)
        {
            data.Password=await bcrypt.hash(data.Password,4)
        }
const datainfo= await User.findByIdAndUpdate(userID,data,{runValidators: true,new:true});
    console.log(datainfo);
    res.send('the update is done');
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message);
    }
    
    
})

module.exports=router;