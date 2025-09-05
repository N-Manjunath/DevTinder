const express=require("express");
const Connections=require('../models/Connections')
const userAuth = require("../middleware/userAuth");
const { findById } = require("../models/user");
const User = require("../models/user");
const router=express.Router();

router.post("/send/:status/:userID",userAuth,async(req,res)=>
{
    try{
    const user=req.user;
    const fromID=user._id;
    const toID=req.params.userID;
    const status=req.params.status;
    const Userconnection=new Connections({
        fromID,
        toID,
        status,

    })
    const hi1=await User.findById(toID);
    console.log(hi1);
    if(!hi1)
    {
        throw new Error("the to user doesnt exists");
    }
    const hi=await Connections.findOne({fromID,toID});
    console.log(hi);
    if(hi)
    {
        throw new Error("The connection already exists !");
    }
    const data=await Userconnection.save();
    res.json({message:'The connection is done',
        data
    })
}
catch(err)
{
    res.status(400).send("ERROR :"+err.message);
}
})

module.exports=router;