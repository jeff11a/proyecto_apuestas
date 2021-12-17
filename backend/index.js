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
const eventsRoute = require("./routes/events");
const userRoute = require("./routes/userData");
const historyRoute = require("./routes/history");
//To initiate the variables in .env
dotenv.config();

//connect to DB, WE saved our url in the .env

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to db");
});

//Middleware

app.use(cors());
app.use(express.json());

//Route Middlewares
//Everything in the authRoute will have the prefix /api/user
app.use("/api/user", authRoute);
//Whenb our users go to /api/posts
app.use("/api/posts", postRoute);

app.use("/api/eventos", eventsRoute);
app.use("/api/historial", historyRoute);

//prueba obteniendo usuario
app.use("/api/user", userRoute);

//2 create the folder routes

//1 to start up the server
app.listen(3002, () => {
  console.log("server up and running");
});
