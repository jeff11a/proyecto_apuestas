module.exports = app => {
    const bets = require("../controllers/bet.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", bets.create);
  
    // Retrieve all Tutorials
    router.get("/", bets.findAll);
  
    // Retrieve all published Tutorials
    router.get("/active", bets.findAllActive);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", bets.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", bets.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", bets.delete);
  
    // Create a new Tutorial
    router.delete("/", bets.deleteAll);
  
    app.use("/api/bets", router);
  };