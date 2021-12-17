//This are our authentification routes

//.Router is like using app.get instead router.get
const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//async because we need sometime before sumitting to the db
router.post("/register", async (req, res) => {
  //request.body gets the json with the data we send
  //To read this data as json we need a body-parser

  const { error } = registerValidation(req.body);

  //400 means it's a bad request
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  const userNameExist = await User.findOne({
    userName: req.body.userName,
  }).exec();
  if (userNameExist) return res.status(400).send("Username already exists");

  //Hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
    dateBirth: req.body.dateBirth,
    age: req.body.age,
  });

  try {
    const savedUser = await user.save();

    res.send({ user: user.id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE  CREATE A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send("Username or password is wrong");

  //Checking if the passowrd is correct
  //.compare we are checking the password send by the user with the hashed one
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //After we login we get a jwt token to know that we alread are login

  //create and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).send({
    authToken: token,
    id: user._id,
    name: user.name,
    state: user.state,
  });
});

module.exports = router;
