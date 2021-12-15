const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.country || !req.body.phoneNumber || !req.body.password || !req.body.birthday || !req.body.typeUser) {
        res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
        return;
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        typeUser: req.body.typeUser,
        balance: req.body.balance,
        bets: req.body.bets,
        active: req.body.active ? req.body.active : true
    });

    user
        .save(user)
        .then(data => {
            res.send({ message: "¡Usuario registrado correctamente!" });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió algún error al crear el usuario"
            });
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

            var authorities = [];

            
            authorities.push("ROLE_" + user.typeUser.toUpperCase());
            
            res.status(200).send({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};