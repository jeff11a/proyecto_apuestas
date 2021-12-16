const router = require("express").Router();
//If I want to make this posts private I bring back the middleware
const verify = require("./verifyToken");

//after the path we can add the middleware
//To get this data we have to send the token we get with login jwt, to the headers of the get requests
router.get("/", verify, (req, res) => {
  //We get the id and the date it was created
  res.send(req.user);
  //if we want to find the user based on this token
  //User.findbyOne({ _id: req.user });
});

module.exports = router;
