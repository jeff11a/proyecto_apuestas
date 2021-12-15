const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "¡Error! ¡El correo electrónico ya está en uso!" });
        return;
      }

      next();
    });
 
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: `¡Error! ¡El rol ${req.body.roles} no existe!`
        });
        return;
      }
    
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted
};

module.exports = verifySignUp;