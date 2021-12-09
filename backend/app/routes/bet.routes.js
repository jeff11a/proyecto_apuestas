module.exports = app => {
    const bets = require("../controllers/bet.controller.js");
  
    var router = require("express").Router();
  
    // Crear nuevo evento de apuesta
    router.post("/", bets.create);
  
    // Retrieve all bets
    router.get("/", bets.findAll);

    router.get("/finished", bets.findAllFinished);

    router.get("/countFinished", bets.countFinished);

    router.get("/countAll", bets.countAll);

    router.get("/countActive", bets.countActive);
  
    // Retrieve all published bets
    router.get("/active", bets.findAllActive);
  
    // Retrieve a single bet with id
    router.get("/:id", bets.findOne);
  
    // Update a bet with id
    router.put("/:id", bets.update);
  
    // Delete a bet with id
    router.delete("/:id", bets.delete);
  
    // Create a new bet
    router.delete("/", bets.deleteAll);
  
    app.use("/api/bets", router);
  };