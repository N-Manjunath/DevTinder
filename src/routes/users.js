const express=require('express');
const userAuth = require('../middleware/userAuth');
const Connections = require('../models/Connections');
const router=express.Router();

//to get all the requests of a user

router.get("/users/requests/received",userAuth,async(req,res)=>
{
    const LoggedInuser=req.user;
    const data=await Connections.find({toID:LoggedInuser._id,status:"Interested"})
    .populate("fromID"," firstName lastName");
    res.json(data);
})

//to get all connections of a user

router.get("/users/connections",userAuth,async(req,res)=>
{
    const LoggedInuser=req.user;
    const connection=await Connections.find({
        $or:[
            {toID:LoggedInuser._id,status:"Accepted"},
            {fromID:LoggedInuser._id,status:"Accepted"}
        ]
    }).populate("toID","firstName").populate("fromID","firstName");
    const data=connection.map((row)=>{
        if(row.fromID._id.toString()===LoggedInuser._id.toString())
        {
            return row.toID;
        }
        return fromID;        
    })
    res.json(data);
})

module.exports=router;