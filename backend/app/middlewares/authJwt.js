const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No se proporciona ninguna token." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "No está autorizado." });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ _id: user.roles }, (err, role) => {

        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === 'Admin') {
          next();
          return;
        }

        res.status(403).send({ message: "Se requiere un rol de administrador." });
        return;
      }
    );
  });
};

isInterno = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ _id: user.roles }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === 'Interno') {
          console.log("Interno");
          next();
          return;
        }

        res.status(403).send({ message: "Se requiere un rol de Interno!" });
        return;
      }
    );
  });
};

isCliente = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: user.roles
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (roles.name === 'Cliente') {
          console.log("Cliente");
          next();
          return;
        }


        res.status(403).send({ message: "Se requiere un rol de Cliente!" });
        return;
      }
    );
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isInterno,
  isCliente
};
module.exports = authJwt;