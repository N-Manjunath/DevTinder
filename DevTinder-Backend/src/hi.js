const express=require('express');
const app=express();

app.listen(8000,()=>
{
    console.log("the server is connected");
})
app.get('/',(req,res)=>
{
    res.send("the request is received");
})