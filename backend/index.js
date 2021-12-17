//We initiate our first server
const express = require("express");
const cors = require("cors");
const app = express();
//We stored our url for connection with mongo there in a enviromental variable (.env)
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes\
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
//prueba obteniendo usuario
const userRoute = require("./routes/userData");
//To initiate the variables in .env
dotenv.config();

//connect to DB, WE saved our url in the .env
//Second parameter in video {useNewUrlParser: true} was not require by nodemon
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to db");
});

//Middleware
////Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.

//We this middleware we can send post request and see the json data
app.use(cors());
app.use(express.json());

//Route Middlewares
//Everything in the authRoute will have the prefix /api/user
app.use("/api/user", authRoute);
//Whenb our users go to /api/posts
app.use("/api/posts", postRoute);

//prueba obteniendo usuario
app.use("/api/user", userRoute);

//2 create the folder routes

//1 to start up the server
//the second parameter is a callback function when the server starts
app.listen(3002, () => {
  console.log("server up and running");
});
