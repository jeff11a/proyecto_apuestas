const jwt = require("jsonwebtoken");

//middleware function that we can add to routes that we want to be protected
//we can add a middleware function to any route that we want to be procteted or private
//without having a token

module.exports = function auth(req, res, next) {
  //get the token from our header
  //checks when we're sending a request if the user has that token
  const token = req.header("auth-token");

  //if it doesn't have the token
  //401 is a resource that we cannot access
  if (!token) return res.status(401).send("Access Denied");

  try {
    //we are going to verify that token WE OUR secret key in .env file

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //we get back the data we asign in auth, in this case the id
    req.user = verified;

    //then wahtever is next
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
