const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, async (req, res) => {
  //We get the id and the date it was created
  const user = await User.findOne({ _id: req.user });
  res.send(user);
});

router.put("/", verify, async (req, res) => {
  //We get the id and the date it was created
  const user = await User.updateOne(
    { _id: req.user },
    { bank: req.body.bank, balance: req.body.balance }
  );
  res.send(user);
});

module.exports = router;
