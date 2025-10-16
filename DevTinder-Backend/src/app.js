const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://dev-tinder-r1fo-xzidts2n0-n-manjunaths-projects.vercel.app", // your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routers
const feedRouter = require("./routes/users");
const userRouter = require("./routes/UserInfo");       // your get/edit user routes
const authRouter = require("./routes/validateUser");       // feed & connections
const connectionsRouter = require("./routes/connections");

app.use("/", authRouter);          // /auth/signup, /auth/login
app.use("/", userRouter);          // /user, /user/edit
app.use("/", feedRouter);          // /feed/user/feed etc
app.use("/", connectionsRouter); // /connections/send etc

// Test route
app.get("/", (req, res) => res.send("API is running"));

// DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
