const router = require("express").Router();
//If I want to make this posts private I bring back the middleware
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  //We get the id and the date it was created
  res.send(req.user);
});

module.exports = router;
