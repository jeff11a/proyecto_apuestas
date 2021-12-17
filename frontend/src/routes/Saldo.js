import Navbar from "../components/Navbar";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import dataHandler from "../services/dataHandler";
import utils from "../utils/utils.js";
import { btnMoney } from "../utils/utilsCss.js";

const Apostar = () => {
  const [inputValue, setInputValue] = useState("");
  const [updateUsuarios, setUpdateUsuarios] = useState(false);
  const [usuario, setUsuario] = useState({});
  const userUrl = "http://localhost:3002/api/user";
  useEffect(() => {
    dataHandler
      .getUser(userUrl, localStorage.getItem("authToken"))
      .then((values) => {
        setUsuario(values);
      });
  }, [updateUsuarios]);

  const onClick = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log("click ");
  };

  const depositar = () => {
    if (usuario && utils.isNumeric(inputValue)) {
      const bancoActualDb = usuario.bank;
      const saldoActualDb = usuario.balance;

      const saldo = Number(inputValue);

      if (bancoActualDb >= saldo) {
        const newSaldoDb = saldoActualDb + Number(saldo);

        const newUser = {
          ...usuario,
          balance: newSaldoDb,
          bank: bancoActualDb - Number(saldo),
        };

        dataHandler
          .updateUser(userUrl, newUser, localStorage.getItem("authToken"))
          .then(setUpdateUsuarios(!updateUsuarios));
      } else {
        console.log(
          "No suficiente en el banco ",
          bancoActualDb,
          " saldo ",
          saldo
        );
      }
    } else {
      console.log("Saldo no es numero");
    }
  };

  const retirar = () => {
    if (usuario && utils.isNumeric(inputValue)) {
      const bancoActualDb = usuario.bank;
      const saldoActualDb = usuario.balance;

      console.log("bank ", bancoActualDb);
      console.log("saldo ", saldoActualDb);
      const saldo = Number(inputValue);

      if (saldoActualDb > 0) {
        const newBanco = bancoActualDb + Number(saldo);

        const newUser = {
          ...usuario,
          bank: newBanco,
          balance: saldoActualDb - Number(saldo),
        };

        dataHandler
          .updateUser(userUrl, newUser, localStorage.getItem("authToken"))
          .then(setUpdateUsuarios(!updateUsuarios));
      } else {
        console.log(
          "No suficiente en el banco ",
          bancoActualDb,
          " saldo ",
          saldo
        );
      }
    } else {
      console.log("Saldo retirar no es numero");
    }
  };

  return (
    <section className="container-flow bg_white2">
      <Navbar />
      <div className="col-md-5 rounded_15 mx-auto d-flex flex-column mt-5 p-4 bg_grayAlto">
        <div className="bg_darkHeavyMetal d text_gold d-flex flex-row mb-2 p-1 rounded_15 shadow">
          <span className="me-auto fs-4">
            Hola {usuario ? usuario.name : "Jhon"}
          </span>

          <span className="text-end fs-4">
            ${usuario ? usuario.balance : "0.00"} <br />
            Saldo actual
          </span>
        </div>
        <div className="bg_darkHeavyMetal d text_gold d-flex flex-row mb-2 p-1 rounded_15 shadow">
          <span className="me-auto">Total en Banco</span>
          <span className="text-end">
            ${usuario ? usuario.bank : "0.00"} <br />
          </span>
        </div>
        <div className="d-flex flex-row">
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
          <FaDollarSign className="fs-4 mt-2 ms-auto text_darkHeavyMetal" />
          <input
            type="text"
            className="inputApostar rounded_15 shadow "
            placeholder="Ej: 100000"
            value={inputValue}
            onChange={onClick}
            onBlur={onClick}
          />
        </div>
        <div className="mt-2 d-flex justify-content-center">
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
    </section>
  );
};
export default Apostar;
