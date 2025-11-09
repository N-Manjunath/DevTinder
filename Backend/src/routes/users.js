const express=require('express');
const userAuth = require('../middleware/userAuth');
const Connections = require('../models/Connections');
const User = require('../models/user');
const router=express.Router();


//to check the connection status

router.get("/users/requests/sent",userAuth,async(req,res)=>
{
    const LoggedInuser=req.user;
    const connections=await Connections.find({fromID:LoggedInuser._id,status:"Interested"})
    .populate("toID","firstName lastName PhotoUrl");
    const data=connections.map((conn)=>({
         user:conn.toID,
        status:conn.status
    }));
       
   
    res.json(data);

})

//to get all the requests of a user

router.get("/users/requests/received",userAuth,async(req,res)=>
{
    const LoggedInuser=req.user;
    const data=await Connections.find({toID:LoggedInuser._id,status:"Interested"})
    .populate("fromID","firstName lastName Gender Age PhotoUrl");
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
    }).populate("toID","firstName lastName Gender Age PhotoUrl Skills").populate("fromID","firstName lastName Gender Age PhotoUrl Skills");
    const data=connection.map((row)=>{
        if(row.fromID._id.toString()===LoggedInuser._id.toString())
        {
            return row.toID;
        }
        return row.fromID;        
    })
    res.json(data);
})

// user feed

router.get("/user/feed",userAuth,async(req,res)=>
{
    const USER_DATA=['firstName','lastName','Age','Gender','Bio','Skills','PhotoUrl'];
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
    const user=await User.find({
       $and: [{_id:{$nin: Array.from(hideuser)}},
        {_id:{$ne:LoggedInuser._id}},],
    }).select(USER_DATA)
    // console.log(user);
    res.json(user);
})


module.exports=router;