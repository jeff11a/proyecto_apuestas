const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  //get the token from our header
  const token = req.header("auth-token");

  //if it doesn't have the token

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
