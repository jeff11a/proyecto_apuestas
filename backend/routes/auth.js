//This are our authentification routes

//.Router is like using app.get instead router.get
const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.
//When using app.use('/api/user', authRoute) the first parameter is added api/user/register
//async because we need sometime before sumitting to the db
router.post("/register", async (req, res) => {
  //request.body gets the json with the data we send
  //To read this data as json we need a body-parser

  const { error } = registerValidation(req.body);

  //400 means it's a bad request
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  //findOne will check if we already have a email like the body one
  //exec returns null, we can replace it with a callback function
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) return res.status(400).send("Email already exists");
  const userNameExist = await User.findOne({
    userName: req.body.userName,
  }).exec();
  if (userNameExist) return res.status(400).send("Username already exists");

  //Hash the passwords
  //a salt is like a random string of characters to hash the passwords
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
    //We are going to try to submit / save a user
    //we are taking the user above and we call the save
    const savedUser = await user.save();

    //We are going to send only the user id
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
  //we can send information to this token
  //in the frontend when you login you have access to this token's data
  //the second argument is a kind of password saved in .env
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //wE SEND TO the respond the token to the header
  //if you use .send with the token you can add the string to https://jwt.io/ and see what you just send
  //using jwt.io the iat property is the time it was created

  res
    .header("auth-token", token)
    .send({
      authToken: token,
      id: user._id,
      name: user.name,
      state: user.state,
    });
  //res.json({ authToken: token, id: user._id, name: user.name });
});

//exporting the module
module.exports = router;
