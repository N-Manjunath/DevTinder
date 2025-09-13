const express=require('express');
const userAuth = require('../middleware/userAuth');
const Connections = require('../models/Connections');
const User = require('../models/user');
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

// user feed

router.get("/user/feed",userAuth,async(req,res)=>
{
    const USER_DATA=['firstName','lastName','Age','Gender','Bio'];
    const LoggedInuser=req.user;
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 2;
    const skip=(page-1)*limit;
    const connectionreq=await Connections.find({
        $or:[
            {toID:LoggedInuser._id},
            {fromID:LoggedInuser._id}
        ]
    }).select('fromID toID');
    const hideuser=new Set();
    connectionreq.forEach((req)=>
    {
        hideuser.add(req.fromID.toString());
        hideuser.add(req.toID.toString());
    })
    //console.log(hideuser);
    const user=await User.find({
       $and: [{_id:{$nin: Array.from(hideuser)}},
        {_id:{$ne:LoggedInuser._id}},],
    }).select(USER_DATA)
    res.json(user);
})


module.exports=router;