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
