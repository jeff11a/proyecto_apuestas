const router = require("express").Router();
//If I want to make this posts private I bring back the middleware
const verify = require("./verifyToken");
const User = require("../model/User");
//after the path we can add the middleware
//To get this data we have to send the token we get with login jwt, to the headers of the get requests
router.get("/", verify, async (req, res) => {
  //We get the id and the date it was created
  const user = await User.findOne({ _id: req.user });
  res.send(user);
  //if we want to find the user based on this token
  //User.findbyOne({ _id: req.user }); ks
});

router.put("/", verify, async (req, res) => {
  //We get the id and the date it was created
  const user = await User.updateOne(
    { _id: req.user },
    { bank: req.body.bank, balance: req.body.balance }
  );
  res.send(user);
  //if we want to find the user based on this token
  //User.findbyOne({ _id: req.user }); ks
});

module.exports = router;
