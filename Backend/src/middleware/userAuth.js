 const User=require("../models/user");
 const jwt=require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;
    console.log("Token:", token);

    if (!token) {
      return res.status(401).send("Please login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded._id);
    console.log("User:", user);

    req.user = user;
    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(400).send(err.message);
  }
};
 module.exports=userAuth;