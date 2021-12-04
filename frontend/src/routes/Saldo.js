import Navbar from "../components/Navbar";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import dataHandler from "../services/dataHandler";
import utils from "../utils/utils.js";
import { btnMoney } from "../utils/utilsCss.js";

const Apostar = () => {
  const id = process.env.REACT_APP_CLIENTE;

  const [usuarios, setUsuarios] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [updateUsuarios, setUpdateUsuarios] = useState(false);

  useEffect(() => {
    dataHandler
      .getAll("http://localhost:3001/usuarios")
      .then((values) => setUsuarios(values));
  }, [updateUsuarios]);

  const onClick = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log("click ");
  };

  const depositar = () => {
    if (usuarios.length > 0 && utils.isNumeric(inputValue)) {
      const bancoActual = usuarios[id].banco;
      const saldoActual = usuarios[id].saldo;
      const saldo = Number(inputValue);

      if (bancoActual >= saldo) {
        const newSaldo = saldoActual + Number(saldo);

        const newUser = {
          ...usuarios[id],
          saldo: newSaldo,
          banco: bancoActual - Number(saldo),
        };

        dataHandler
          .update("http://localhost:3001/usuarios", id, newUser)
          .then(setUpdateUsuarios(!updateUsuarios));
      } else {
        console.log(
          "No suficiente en el banco ",
          bancoActual,
          " saldo ",
          saldo
        );
      }
    } else {
      console.log("Saldo no es numero");
    }
  };

  const retirar = () => {
    if (usuarios.length > 0 && utils.isNumeric(inputValue)) {
      const bancoActual = usuarios[id].banco;
      const saldoActual = usuarios[id].saldo;
      const saldo = Number(inputValue);

      if (saldoActual > 0) {
        const newBanco = bancoActual + Number(saldo);

        const newUser = {
          ...usuarios[id],
          banco: newBanco,
          saldo: saldoActual - Number(saldo),
        };

        dataHandler
          .update("http://localhost:3001/usuarios", id, newUser)
          .then(setUpdateUsuarios(!updateUsuarios));
      } else {
        console.log(
          "No suficiente en el banco ",
          bancoActual,
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
            Hola {usuarios.length > 0 ? usuarios[id].nombre : "Jhon"}
          </span>

          <span className="text-end fs-4">
            ${usuarios.length > 0 ? usuarios[id].saldo.toFixed(2) : "0.00"}{" "}
            <br />
            Saldo actual
          </span>
        </div>
        <div className="bg_darkHeavyMetal d text_gold d-flex flex-row mb-2 p-1 rounded_15 shadow">
          <span className="me-auto">Total en Banco</span>
          <span className="text-end">
            ${usuarios.length > 0 ? usuarios[id].banco.toFixed(2) : "0.00"}{" "}
            <br />
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
