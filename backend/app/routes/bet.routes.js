module.exports = app => {
    const bets = require("../controllers/bet.controller.js");
  
    var router = require("express").Router();
  
    // Crear nuevo evento de apuesta
    router.post("/", bets.create);
  
    // Busca todas los eventos de apuestas
    router.get("/", bets.findAll);

    //Busca todos los eventos de apuesta finalizados
    router.get("/finished", bets.findAllFinished);

    //Cuenta todas las apuestas finalizadas
    router.get("/countFinished", bets.countFinished);

    //Cuenta todos los eventos de apuesta
    router.get("/countAll", bets.countAll);

    //Cuenta todos los eventos de apuetas disponibles y en juego
    router.get("/countActive", bets.countActive);
  
    // Busca todos los eventos de apuestas disponibles y en juego
    router.get("/active", bets.findAllActive);
  
    // Busca eventos de apuestas por id
    router.get("/:id", bets.findOne);
  
    // Actualiza eventos segun la id
    router.put("/:id", bets.update);
  
    // Elimina eventos segun id
    router.delete("/:id", bets.delete);
  
    // Elimina todo los eventos de apuesta
    router.delete("/", bets.deleteAll);
  
    app.use("/api/bets", router);
  };