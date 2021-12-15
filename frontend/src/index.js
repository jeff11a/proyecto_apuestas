import React from "react";
import { render } from "react-dom";

import { BrowserRouter, Routes,  Route } from "react-router-dom";

//Paginas
import App from "./App";
import Login from "./routes/Login";
import Registro from "./routes/Registro";
import Saldo from "./routes/Saldo";
import Finalizados from "./routes/Finalizados";
import Dashboard from "./routes/Dashboard";
import UsersList from "./components/dashboard/UsersList";
import DashboardAddUser from "./routes/DashboardAddUser";
import DashboardAddBet from "./routes/DashboardAddBet";
import User from "./components/dashboard/Users";
import Bets from "./components/dashboard/Bets";
import BetsList from "./components/dashboard/BetsList";
import DashboardReports from "./routes/DashboardReports";
import NoPage from "./routes/NoPage";
//CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all.js";

//import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "./index.css";
import "./components/Navbar.css";
import "./components/Sidebar1.css";
import "./components/Game.css";
import "./routes/Saldo.css";

//import "./assets/js/sb-admin-2"
const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/saldo" element={<Saldo />} />
      <Route path="/finalizados" element={<Finalizados />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/dashboard/users" element={<UsersList/>} />
      <Route path="/dashboard/users/:id" element={<User/>} />
      <Route path="/dashboard/addUser" element={<DashboardAddUser />} />
      <Route path="/dashboard/bets" element={<BetsList />} />
      <Route path="/dashboard/bets/:id" element={<Bets />} />
      <Route path="/dashboard/addBet" element={<DashboardAddBet />} />
      <Route path="/dashboard/reports" element={<DashboardReports />} />
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
