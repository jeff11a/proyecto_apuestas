import { FaChess } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import chessboard from "../assets/chessboard.jpg";
import { useState, useEffect } from "react";
import dataHandler from "../services/dataHandler";
import utils from "../utils/utils.js";
import { btnMoney } from "../utils/utilsCss.js";

const Participantes = (props) => {
  const { evento, setSeleccionEvento } = props;

  const participante1 = evento.participantes[0];
  const participante2 = evento.participantes[1];

  return (
    <select
      onChange={(event) => {
        setSeleccionEvento(event.target.value);
      }}
    >
      <option value="0" defaultValue>
        {participante1}
      </option>
      <option value="1">{participante2}</option>
    </select>
  );
};

const Game = (props) => {
  const id = process.env.REACT_APP_CLIENTE;
  const urlUsuarios = "http://localhost:3001/usuarios";
  const { eventoActual, eventos, usuarios, setUsuarios } = props;
  const [eventoGanador, setEventoGanador] = useState("");
  const [condicionalGanador, setCondicionalGanador] = useState();
  const [inputValue, setInputValue] = useState("");
  const [updateUsuarios, setUpdateUsuarios] = useState(false);
  const [seleccionEvento, setSeleccionEvento] = useState("0");

  useEffect(() => {
    dataHandler.getAll(urlUsuarios).then((values) => setUsuarios(values));
  }, [updateUsuarios]);

  const onClick = (event) => {
    //Funcion que toma el atributo value y lo asigna a un state
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const apostadores = [
    {
      id: 1,
      nombre: "Carlos",
      cantidad: 100000,
      ganador: null,
      opcion: 1,
    },
    {
      id: 2,
      nombre: "Marcos",
      cantidad: 50000,
      ganador: null,

      opcion: 0,
    },
    {
      id: 3,
      nombre: "Juan",
      cantidad: 200000,
      ganador: null,
      opcion: 0,
    },
  ];

  const apostar = (event) => {
    event.preventDefault();
    setEventoGanador("");
    if (usuarios.length > 0 && utils.isNumeric(inputValue)) {
      const usuarioApuesta = seleccionEvento;
      const saldoActual = usuarios[id].saldo;
      const dineroApostado = Number(inputValue);

      if (window.confirm(`Esta seguro de apostar $${inputValue}?`)) {
        const newSaldo = saldoActual - dineroApostado;
        console.log(id);
        console.log(usuarios[4]);
        const newUser = {
          ...usuarios[id],
          saldo: newSaldo,
        };
        console.log(newUser);

        dataHandler.update(urlUsuarios, id, newUser).then(() => {
          setUpdateUsuarios(!updateUsuarios);

          console.log("usuario apuesta", usuarioApuesta);

          const clienteApostador = {
            id: usuarios[id].id,
            nombre: usuarios[id].nombre,
            cantidad: dineroApostado,
            ganador: null,

            opcion: Number(usuarioApuesta),
          };
          const todosLosApostadores = apostadores.concat(clienteApostador);
          console.log(todosLosApostadores);

          const competidorGanador = utils.getRandomInt(0, 1);
          console.log("ganador", competidorGanador);

          const ganadores = todosLosApostadores.filter(
            (apostador) => apostador.opcion === competidorGanador
          );
          console.log("ganadores", ganadores);

          const perdedores = todosLosApostadores.filter(
            (apostador) => apostador.opcion !== competidorGanador
          );
          console.log("perdedores", perdedores);

          if (ganadores.some((ganador) => ganador.id === usuarios[id].id)) {
            console.log("gano");
            setEventoGanador("Gano");
            setCondicionalGanador(true);
            ganancia();
          } else {
            console.log("perdio");
            setEventoGanador("Perdio");
            setCondicionalGanador(false);
          }
        });
      }
      //Cuando se da click en apostar se resta del saldo el dinero a espera si gano
    } else {
      console.log("No es un numero");
    }
  };

  const ganancia = () => {
    const bancoActual = usuarios[id].banco;
    const saldoActual = usuarios[id].saldo;
    console.log(saldoActual);
    const apostado = Number(inputValue);
    console.log("entra ganancia");
    if (apostado) {
      console.log("true apostado");
      const newSaldo = saldoActual + Number(apostado) * 4;

      const newUser = {
        ...usuarios[id],
        saldo: newSaldo,
      };
      console.log("old user", usuarios[id]);
      console.log("new user", newUser);

      dataHandler
        .update(urlUsuarios, id, newUser)
        .then(() => {
          setUpdateUsuarios(!updateUsuarios);
          setUpdateUsuarios(updateUsuarios);
        })
        .catch((error) => console.log(error));
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

                  {eventos[eventoActual] ? (
                    <Participantes
                      evento={eventos[eventoActual]}
                      setSeleccionEvento={setSeleccionEvento}
                    />
                  ) : null}

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
