const db = require("../models");
const Bet = db.bets;

//Paginación
const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Crear y guardar un nuevo evento
exports.create = (req, res) => {
  // Validar datos requeridos
  if (!req.body.player1 || !req.body.player2 || !req.body.torneo || !req.body.modalidad || !req.body.estado) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crea un evento
  const bet = new Bet({
    player1: req.body.player1,
    player2: req.body.player2,
    torneo: req.body.torneo,
    modalidad: req.body.modalidad,
    totalP1: req.body.totalP1,
    saldoP1: req.body.saldoP1,
    totalP2: req.body.totalP2,
    saldoP2: req.body.saldoP2,
    saldoTotal: req.body.saldoTotal,
    estado: req.body.estado,
    apostadores: req.body.apostadores,
    activo: req.body.activo ? req.body.activo : false,
    ganador: req.body.ganador
  });

  // Guarda un evento en la base de datos
  bet
    .save(bet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el evento de apuesta"
      });
    });
};

// Recupera todos los eventos de la base de datos
// Si hay un termino de busqueda devuelve los eventos que coincidan con el termino
exports.findAll = (req, res) => {
  const { page, size, player } = req.query
  var condition = player
    ? {
      $or: [{ player1: { $regex: new RegExp(player), $options: "i" } },
      { player2: { $regex: new RegExp(player), $options: "i" } },
      { torneo: { $regex: new RegExp(player), $options: "i" } }]
    }
    : {};

  const { limit, offset } = getPagination(page, size);

  Bet.paginate(condition, { offset, limit })
    .then(data => {
      res.send(
        {
          totalItems: data.totalDocs,
          bets: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los eventos de apuesta."
      });
    });
};

// Busca eventos por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Evento de apuesta no encontrado con id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar el evento de apuesta con id =" + id });
    });
};

// Actualiza los datos de un evento por el id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos para actualizar no pueden estar vacíos!"
    });
  }

  const id = req.params.id;

  Bet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar el evento de apuesta con id = ${id}. ¡Quizás no se encontró el evento!`
        });
      } else res.send({ message: "El evento de apuesta se actualizó correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el evento de apuesta con id =" + id
      });
    });
};

// Eliminar un evento con la id especificada en la solicitud
exports.delete = (req, res) => {
  const id = req.params.id;

  Bet.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar el evento de apuesta con id = ${id}. ¡Quizás no se encontró el evento de apuesta!`
        });
      } else {
        res.send({
          message: "¡El evento de apuesta se eliminó correctamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el evento de apuesta con id = " + id
      });
    });
};

// Elimine todos los eventos de la base de datos.
exports.deleteAll = (req, res) => {
  Bet.deleteMany({})
    .then(data => {
      if (data.deletedCount == 1) {
        res.send({
          message: `¡Los eventos de apuesta se eliminaron con éxito!`
        });
      } else {
        res.send({
          message: `¡Los ${data.deletedCount} eventos de apuesta se eliminaron con éxito!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los eventos de apuesta."
      });
    });
};

// Encuentra todos los eventos activos
exports.findAllActive = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Bet.paginate({ activo: true, $or: [{ estado: /Disponible/i }, { estado: /Jugando/i }] }, { offset, limit })
    .then(data => {
      res.send({
        totalItems: data.totalDocs,
        bets: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los eventos de apuesta activos."
      });
    });
};

// Encuentra todos los eventos finalizados
exports.findAllFinished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Bet.paginate({ estado: "Finalizado", activo: true }, { offset, limit })
    .then(data => {
      res.send({
        totalItems: data.totalDocs,
        bets: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los eventos de apuesta finalizados."
      });
    });
};

//cuenta los eventos de apuestas finalizados
exports.countFinished = (req, res) => {
  Bet.countDocuments({ estado: "Finalizado", activo: true })
    .then(count => {
      res.send({ cont: count });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo contar los eventos finalizados"
      });
    });
};

//Contar eventos de apuestas disponibles 

exports.countActive = (req, res) => {
  Bet.countDocuments({ $or: [{ estado: /Disponible/i }, { estado: /Jugando/i }], activo: true })
    .then(count => {
      res.send({ cont: count });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo contar los eventos disponibles"
      });
    });
};

//contar todos los eventos
exports.countAll = (req, res) => {
  Bet.countDocuments({ activo: true })
    .then(count => {
      res.send({ cont: count });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "No se pudo contar los eventos"
      });
    });
};