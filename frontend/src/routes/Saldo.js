import Navbar from "../components/Navbar";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import { useState, useEffect } from "react";

//import dataHandler from "../services/dataHandler";
import AuthService from "../services/AuthService";
import UserDataService from "../services/UserService";

import { btnMoney } from "../utils/utilsCss.js";

const Apostar = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    balance: 0,
    banco: 0,
    birthday: "",
    roles: "",
    active: true
  };

  const [user, setUser] = useState(initialUserState);


  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setUser(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const obtenerUser = () => {
    const usuario = AuthService.getCurrentUser();

    if (usuario) {
      setCurrentUser(usuario);
      getUser(usuario.id);
    }
  }



  useEffect(obtenerUser, []);

  const updateUser = () => {
    UserDataService.update(currentUser.id, user)
      .then(response => {
        //console.log(response.data);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [inputValue, setInputValue] = useState("");

  const onClick = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const depositar = () => {
    const bancoActual = user.banco;
    const saldoActual = user.balance;
    const saldo = Number(inputValue);

    if (bancoActual >= saldo) {
      const newSaldo = saldoActual + Number(saldo);

      user.balance = newSaldo;
      user.banco = bancoActual - Number(saldo);

      updateUser();

    } else {
      console.log(
        "No hay suficiente saldo para realizar la transacción"
      );
    }
  };



  const retirar = () => {
    const bancoActual = user.banco;
    const saldoActual = user.balance;
    const saldo = Number(inputValue);

    if (saldoActual >= saldo) {
      const newBanco = bancoActual + Number(saldo);



      user.banco = newBanco;
      user.balance = saldoActual - Number(saldo);

        updateUser();

    } else {
      console.log(
        "No hay suficiente saldo para realizar la transacción"
      );
    }

  };

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="row">
        <div className="col-3"></div>
        <div className="col rounded_15  d-flex flex-column mt-5 p-4" style={{ backgroundColor: "#fefefe" }}>
          <div className="bg_darkHeavyMetal d text_gold d-flex flex-row mb-2 p-1 rounded_15 shadow">
            <span className="me-auto fs-4">
              Hola {currentUser ? currentUser.firstName + " " + currentUser.lastName : ""}
            </span>

            <span className="text-end fs-4">
              {user.balance > 0 ? Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(user.balance) : "$ 0.00"} <br />
              Saldo actual
            </span>
          </div>

          <div className="bg_darkHeavyMetal d text_gold d-flex flex-row mb-2 p-1 rounded_15 shadow">
            <span className="me-auto">Total en Banco</span>
            <span className="text-end">
              {user.banco > 0 ? Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(user.banco) : "$ 0.00"} <br />
            </span>
          </div>

          <div className="row mt-2">
            <div className="col-7">
              <Button
                txt="20k"
                value="20000"
                onClick={onClick}
                className={btnMoney}
              />
              <Button
                txt="50k"
                value="50000"
                onClick={onClick}
                className={btnMoney}
              />
              <Button
                txt="100k"
                value="100000"
                onClick={onClick}
                className={btnMoney}
              />
              <Button
                txt="500k"
                value="500000"
                onClick={onClick}
                className={btnMoney}
              />
            </div>
            <div className="col-5 d-flex justify-content-end">
              <FaDollarSign className="fs-4 mt-2  text_darkHeavyMetal" />
              <input
                type="number"
                className="inputApostar rounded_15 shadow"
                placeholder="Ej: 100000"
                value={inputValue}
                onChange={onClick}
                onBlur={onClick}
              />
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-center">
            <button className="btn bg_gold btn1 shadow me-2" onClick={depositar}>
              Depositar
            </button>
            <button
              className="btn bg_greenPistachio btn1 shadow"
              onClick={retirar}
            >
              Retirar
            </button>
          </div>

        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};
export default Apostar;