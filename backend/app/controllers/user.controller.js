const db = require("../models");
const User = db.users;
const Role = db.role;

var bcrypt = require("bcryptjs");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
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
    banco: req.body.banco ? req.body.banco : 300000,
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
    }else {
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

          res.send({ message: "¡Usuario registrado correctamente!-" });
        });
      });
    }
  });
};


// Recupere todos los usuarios de la base de datos
exports.findAll = (req, res) => {
  const { page, size, name } = req.query

  var condition = name
    ? {
      $or: [{ firstName: { $regex: new RegExp(name), $options: "i" } },
      { lastName: { $regex: new RegExp(name), $options: "i" } },
      { email: { $regex: new RegExp(name), $options: "i" } }]
    }
    : {};

  const { limit, offset } = getPagination(page, size);

  User.paginate(condition, { offset, limit })
    .then(data => {
      res.send(
        {
          totalItems: data.totalDocs,
          users: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los usuarios."
      });
    });
};

// Buscar un solo usuario con una id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Error al recuperar el usuario con id =" + id });
      return;
    }
    if (!user) {
      res.status(404).send({ message: "Usuario no encontrado con id: " + id });
      return;
    } else {
      Role.findOne({ _id: user.roles }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = role.name;
        const usuario = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          phoneNumber: user.phoneNumber,
          birthday: user.birthday,
          bets: user.bets,
          roles: role.name,
          balance: user.balance,
          banco: user.banco,
          active: user.active
        }
        //console.log(usuario);
        res.send(usuario);
      });
    }
  });
};

// Actualizar un usuario por el id
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos para actualizar no pueden estar vacíos!"
    });
  }

  if(req.body.roles === "Admin" || req.body.roles === "Interno" || req.body.roles === "Cliente"){

    Role.findOne({ name: req.body.roles }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      const usuario = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        bets: req.body.bets,
        roles: role._id,
        balance: req.body.balance,
        banco: req.body.banco,
        active: req.body.active
      }
      const id = req.params.id;
      //console.log(usuario);
  
      User.findByIdAndUpdate(id, usuario, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `No se puede actualizar el usuario con id = ${id}. ¡Quizás no se encontró el usuario!`
            });
          } else res.send({ message: "El usuario se actualizó correctamente." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al actualizar el usuario con id =" + id
          });
        });

    });
    
  }else{

    Role.findOne({ _id: req.body.roles }, (error, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      const id = req.params.id;
      
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `No se puede actualizar el usuario con id = ${id}. ¡Quizás no se encontró el usuario!`
            });
          } else res.send({ message: "El usuario se actualizó correctamente." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al actualizar el usuario con id =" + id
          });
        });

    });
    
  }

};

// Eliminar un usuario con la id especificada en la solicitud
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar el usuario con id = ${id}. ¡Quizás no se encontró el usuario!`
        });
      } else {
        res.send({
          message: "¡El usuario se eliminó correctamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el usuario con id = " + id
      });
    });
};

// Elimine todos los usuarios de la base de datos.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      if (data.deletedCount == 1) {
        res.send({
          message: `¡El usuario se eliminaron con éxito!`
        });
      } else {
        res.send({
          message: `¡Los ${data.deletedCount} usuarios se eliminaron con éxito!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los usuarios."
      });
    });
};

// Encuentra todos los usuarios activos
exports.findAllActive = (req, res) => {
  User.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los usuarios."
      });
    });
};

//Contador de usuarios

exports.countUser = (req, res) => {
  User.countDocuments()
    .then(count => {
      res.send({ cont: count });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo contar los usuarios"
      });
    });
}

//Contador de usuarios cliente
exports.countUserClient = (req, res) => {
  Role.findOne({ name: "Cliente"})
    .then( role => {
      User.countDocuments({ roles: role._id, active: true })
      .then(count => {
        res.send({ cont: count });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "No se pudo contar los usuarios clientes"
        });
      });
    }) 
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo encontrar el rol"
      });
    }); 
};


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.clienteBoard = (req, res) => {
  res.status(200).send("Cliente Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.internoBoard = (req, res) => {
  res.status(200).send("Interno Content.");
}; 
