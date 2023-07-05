const asyncHandler = require("express-async-handler"); //handles our problems automatically
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email }); //<findOne>queries for mongodb

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id), //jwt will help autherise user
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//making queries for search
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? { //or operator in mongodb
      $or: [
      
        { name: { $regex: req.query.search, $options: "i" } }, //regular expression to match exp in mongo
        { email: { $regex: req.query.search, $options: "i" } },
      
      ]
    }
    : {}; //else
  
  const users = await User.find(keyword). //ne=not equal to
  res.send(users);

});

module.exports = { registerUser, authUser , allUsers}; 