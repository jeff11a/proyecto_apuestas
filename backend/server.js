const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Analiza peticiones de content-type - application/json
app.use(express.json());  

// Analiza peticiones de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));  

const db = require("./app/models");
//const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado con exito a MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Error de conexión", err);
    process.exit();
  });

// Ruta sencilla
app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido!" });
});

//Rutas
require("./app/routes/user.routes")(app);
require("./app/routes/bet.routes")(app);

// establece el puerto para escuchar peticiones
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});

/* function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "Cliente"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Cliente' to roles collection");
      });

      new Role({
        name: "Interno"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Interno' to roles collection");
      });

      new Role({
        name: "Admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Admin' to roles collection");
      });
    }
  });
}
 */