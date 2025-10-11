const express=require("express");
const app=express();
const connectDB=require("./config/database");
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // dev
  'https://dev-tinder-mern.vercel.app', // prod frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Respond to preflight requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
