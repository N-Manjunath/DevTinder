const express = require("express");
const router = express.Router();
const validation = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// =================== SIGNUP ===================

router.post("/signup", async (req, res) => {
  try {
    validation(req);

    const { firstName, lastName, EmailId, Password } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({
      firstName,
      lastName,
      EmailId,
      Password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = await savedUser.isjwt();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      token,
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// =================== LOGIN ===================

router.post("/login", async (req, res) => {
  try {

    const { EmailId, Password } = req.body;

    const user = await User.findOne({ EmailId });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await user.validatePassword(Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = await user.isjwt();

    res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// =================== LOGOUT ===================

router.post("/logout", (req, res) => {
  res.json({
    message: "Logout Successful",
  });
});

module.exports = router;