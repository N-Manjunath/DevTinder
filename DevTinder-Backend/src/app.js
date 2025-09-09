const express=require("express");
const app=express();
const connectDB=require("./config/database");
const cors = require('cors')
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
))
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const Users=require("./routes/validateUser");
const UserInfo=require("./routes/UserInfo");
const connections=require("./routes/connections");
const users=require("./routes/users");
const PORT=process.env.PORT;
connectDB().then(()=>
{
    console.log("the db is connected");
    app.listen(PORT,(req,res)=>
{
    console.log("the server is connected");
});
}).catch((err)=>
{
    console.log("DB is not connected "+err.message);
})
app.use("/",Users);
app.use("/",UserInfo);
app.use("/",connections);
app.use("/",users);



//user
