module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo usuario
    router.post("/", users.create);
  
    // Recuperar todos los usurios
    router.get("/", users.findAll);
  
    // Recuperar todos los usuarios publicados
    router.get("/active", users.findAllActive);
    
    //Contar usuarios registrados
    router.get("/count", users.countUser);
    
    //Contar usuarios cliente
    router.get("/countClient", users.countUserClient);
  
    //Recuperar un solo usuario con id
    router.get("/:id", users.findOne);
  
    // Actualizar un usuario con id
    router.put("/:id", users.update);
  
    // Eliminar un usuario con id
    router.delete("/:id", users.delete);
  
    // Eliminar todos los usuarios
    router.delete("/", users.deleteAll);

    app.use("/api/users", router);
  };