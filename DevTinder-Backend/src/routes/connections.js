const express=require("express");
const Connections=require('../models/Connections')
const userAuth = require("../middleware/userAuth");
const { findById } = require("../models/user");
const User = require("../models/user");
const { route } = require("./UserInfo");
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
    //console.log(hi1);
    if(!hi1)
    {
        throw new Error("the to user doesnt exists");
    }
    const hi=await Connections.findOne({
        $or:[{fromID,toID},{fromID:toID,toID:fromID}]});
    //console.log(hi);
    if(hi)
    {
        throw new Error("The connection already exists !");
    }
    const data=await Userconnection.save();
    res.json(  ` message:'The connection is sent from ${user.firstName} to ${hi1.firstName}
    `)
}
catch(err)
{
    res.status(400).send("ERROR :"+err.message);
}
})

router.post("/review/:status/:reqId",userAuth,async(req,res)=>
{
    try{
        LoggedInuser=req.user;
        const allowedstatus=["Accepted","Rejected"];
        const{status,reqId}=req.params;
        if(!allowedstatus.includes(status))
        {
            return res.status(400).send("status is invalid");
        }
        const userconnect=await Connections.findOne({
            _id:reqId,
            toID:LoggedInuser._id,
            status:"Interested"
        });
        if(!userconnect)
        {
            throw new Error("The connection doesnt exists !");
        }
        userconnect.status=status;
        const data=await userconnect.save();
        res.json(data);
    }
    catch(err)
    {
        res.status(400).send("ERROR :"+err.message);
    }
})

module.exports=router;