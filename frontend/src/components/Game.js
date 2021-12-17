import { FaChess } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import chessboard from "../assets/img/chessboard.jpg";
import { useState, useEffect } from "react";
import dataHandler from "../services/dataHandler";
import utils from "../utils/utils.js";
import { btnMoney } from "../utils/utilsCss.js";

const Game = (props) => {
  const id = process.env.REACT_APP_CLIENTE;
  const urlUsuarios = "http://localhost:3001/usuarios";
  const { eventoActual, eventos, usuarios, setUsuarios } = props;
  const [eventoGanador, setEventoGanador] = useState("");
  const [condicionalGanador, setCondicionalGanador] = useState();
  const [inputValue, setInputValue] = useState("");
  const [updateUsuarios, setUpdateUsuarios] = useState(false);

  useEffect(() => {
    dataHandler.getAll(urlUsuarios).then((values) => setUsuarios(values));
  }, [updateUsuarios, setUsuarios]);

  const onClick = (event) => {
    //Funcion que toma el atributo value y lo asigna a un state
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const apostadores = [
    {
      nombre: "Marcos",
      cantidad: 50000,
      ganador: null,
      id: 0,
      opcion: 1,
    },
    {
      nombre: "Carlos",
      cantidad: 100000,
      ganador: null,
      id: 1,
      opcion: 2,
    },
    {
      nombre: "Juan",
      cantidad: 200000,
      ganador: null,
      id: 2,
      opcion: 1,
    },
  ];

  const apostar = (event) => {
    event.preventDefault();
    setEventoGanador("");
    if (usuarios.length > 0 && utils.isNumeric(inputValue)) {
      const usuarioApuesta = Math.floor(Math.random() * 2);

      //Cuando se da click en apostar se resta del saldo el dinero a espera si gano
      dataHandler.update();
      switch (usuarioApuesta) {
        case 0:
          console.log("perdio");

          setEventoGanador("Perdio");
          setCondicionalGanador(false);
          break;
        case 1:
          console.log("gano");
          setEventoGanador("Gano");
          setCondicionalGanador(true);
          ganancia();
          break;

        default:
          break;
      }

      console.log(usuarioApuesta);
    } else {
      console.log("No es un numero");
    }
  };

  const ganancia = () => {
    const bancoActual = usuarios[id].banco;
    const saldoActual = usuarios[id].saldo;
    const apostado = Number(inputValue);

    if (apostado) {
      const newSaldo = saldoActual + Number(apostado);

      const newUser = {
        ...usuarios[id],
        saldo: newSaldo,
      };

      dataHandler
        .update(urlUsuarios, id, newUser)
        .then(setUpdateUsuarios(!updateUsuarios));
    } else {
      console.log("banco ", bancoActual, " apostado ", apostado);
    }
  };

  return (
    <>
      <div className="col-md-10 d-flex align-items-center justify-content-center">
        <div id="chessboard" className="me-4">
          <img
            src={chessboard}
            className="img-thumbnail rounded-circle shadow"
            alt="chessboard"
            id="img_chessboard"
          />
        </div>
        <section className="text-center bg_darkHeavyMetal text_gold rounded_15 shadow p-3">
          <FaChess className="fs-1" />
          <h2 className="display-5 fw-bolder">
            {eventos.length > 0 && eventoActual
              ? eventos[eventoActual].evento
              : "Seleciona un evento"}
          </h2>

          {eventos.length > 0 && eventoActual ? (
            <button
              className="btn bg_greenPistachio text_darkHeavyMetal rounded_15"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Apostar
            </button>
          ) : (
            ""
          )}

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg_darkHeavyMetal ">
                  <h5
                    className="me-auto fs-4 modal-title text_gold"
                    id="exampleModalLabel"
                  >
                    Hola {usuarios.length > 0 ? usuarios[id].nombre : "Jhon"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close bg_gold"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="text-end bg_darkHeavyMetal text_gold p-2 rounded_15">
                    <span>Saldo actual </span>$
                    {usuarios.length > 0 ? usuarios[id].saldo : "0.00"}
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
                    <FaDollarSign className="fs-4 mt-2" />
                    <input
                      type="text"
                      className="inputApostar rounded_15 shadow "
                      id="inputDinero"
                      placeholder="Ej: 100000"
                      value={inputValue}
                      onChange={onClick}
                    />
                  </div>
                  <button
                    className="btn bg_gold btn1 shadow me-2"
                    onClick={apostar}
                  >
                    Apostar
                  </button>
                  <div className="text-start text_darkHeavyMetal">
                    {apostadores.map((apostador) => (
                      <p key={apostador.id}>
                        Usuario {apostador.nombre} aposto ${apostador.cantidad}
                      </p>
                    ))}

                    {condicionalGanador && eventoGanador ? (
                      <p>Gano</p>
                    ) : !condicionalGanador && eventoGanador ? (
                      <p>Perdio</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Game;
