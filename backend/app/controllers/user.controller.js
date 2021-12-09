const db = require("../models");
const User = db.users;

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  // Validar solicitud
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.birthday || !req.body.typeUser) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear un usuario
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    typeUser: req.body.typeUser,
    balance: req.body.balance,
    bets: req.body.bets,
    active: req.body.active ? req.body.active : true
  });

  // Guardar usuario en la base de datos
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el usuario"
      });
    });
};

// Recupere todos los usuarios de la base de datos
exports.findAll = (req, res) => {
  const firstName = req.query.name;
  var condition = firstName ? {$or: [{ firstName: { $regex: new RegExp(firstName), $options: "i" } }, { lastName: { $regex: new RegExp(firstName), $options: "i" }}, { email: { $regex: new RegExp(firstName), $options: "i" }}] } : {};
  User.find(condition)
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

// Buscar un solo usuario con una id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Usuario no encontrado con id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar el usuario con id =" + id });
    });
};

// Actualizar un usuario por el id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos para actualizar no pueden estar vacíos!"
    });
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
      if(data.deletedCount == 1){
        res.send({
          message: `¡El usuario se eliminaron con éxito!`
        });
      }else{
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
/* 
, function (err, count) {
    console.log('hay %d usuarios', count);
  }
*/
exports.countUser = (req, res) => {
  User.countDocuments()
  .then(count => {
    res.send({cont: count});
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
  const nUser = User.countDocuments({ typeUser: "C"})
  .then(count => {
    res.send({cont: count});
  })
  .catch(err => {
    res.status(500).send({
      message:
       err.message || "No se pudo contar los usuarios clientes"
    });
  });
};
