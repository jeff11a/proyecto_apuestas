const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    // Validar solicitud
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.country || !req.body.phoneNumber || !req.body.password || !req.body.birthday || !req.body.roles) {
        res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
        return;
    }

    //Generar salt
    const salt = bcrypt.genSaltSync();

    // Crear un usuario
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        salt: salt,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        bets: req.body.bets ? req.body.bets : [],
        balance: req.body.balance ? req.body.balance : 0,
        active: req.body.active ? req.body.active : true
    });

    // Guardar usuario en la base de datos
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {

            Role.findOne({ name: req.body.roles }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = role._id;
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "¡Usuario registrado correctamente!" });
                });
            });
        } else {
            Role.findOne({ name: "Cliente" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
              user.roles = role._id;
              user.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                res.send({ message: "¡Usuario registrado correctamente!" });
              });
            });
          }
    });
};

exports.signin = (req, res) => {

    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }

            //var clave = bcrypt.hashSync(req.body.password, user.salt)

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña invalida!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            Role.findOne({ _id: user.roles }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                var authorities = "ROLE_" + role.name.toUpperCase();

                res.status(200).send({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });

            });

        });
};