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
      className="border border-1 p-2 m-2 me-auto rounded_10"
    >
      <option value="0" defaultValue>
        {participante1}
      </option>
      <option value="1">{participante2}</option>
    </select>
  );
};

const Game = (props) => {
  const {
    eventoActual,
    eventos,
    usuarios,
    historial,
    setHistorial,
    setUsuarios,
    urlUsuarios,
    urlHistorial,
  } = props;
  const id = process.env.REACT_APP_CLIENTE;

  const [eventoGanador, setEventoGanador] = useState(null);
  const [condicionalGanador, setCondicionalGanador] = useState();
  const [inputValue, setInputValue] = useState("");
  const [updateUsuarios, setUpdateUsuarios] = useState(false);
  const [updateHistorial, setUpdateHistorial] = useState(false);
  const [seleccionEvento, setSeleccionEvento] = useState("0");
  const [competidorGanador, setCompetidorGanador] = useState("");
  const [competidorPerdedor, setCompetidorPerdedor] = useState("");

  const [cantidadGanada, setCantidadGanada] = useState(null);
  const [paraLaCasaDeApuestas, setParaLaCasaDeApuestas] = useState(null);

  useEffect(() => {
    //Cada vez que se cambia de evento se reinician los states que dan informacion
    setParaLaCasaDeApuestas(null);
    setCantidadGanada(null);
    setCompetidorGanador(null);
    setCompetidorPerdedor(null);
    setEventoGanador(null);
  }, [eventoActual]);

  useEffect(() => {
    dataHandler.getAll(urlUsuarios).then((values) => setUsuarios(values));
  }, [updateUsuarios, setUsuarios]);

  useEffect(() => {
    dataHandler.getAll(urlHistorial).then((values) => setHistorial(values));
  }, [updateHistorial]);

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

  const addUsuarioApuesta = ({
    id,
    idUser,
    victoria,
    apuesta,
    ganador,
    fecha,
    ganancia,
    perdida,
  }) => {
    return {
      id,
      idUser,
      victoria,
      apuesta,
      ganador,
      fecha,
      ganancia,
      perdida,
    };
  };

  const apostar = (event) => {
    event.preventDefault();
    setEventoGanador("");
    if (usuarios.length > 0 && utils.isNumeric(inputValue)) {
      const usuarioApuesta = seleccionEvento;
      const saldoActual = usuarios[id].saldo;
      const dineroApostado = Number(inputValue);

      if (window.confirm(`Esta seguro de apostar $${inputValue}?`)) {
        const newSaldo = saldoActual - dineroApostado;
        setCompetidorGanador(null);
        setCompetidorPerdedor(null);
        setCantidadGanada(null);
        setParaLaCasaDeApuestas(null);
        const newUser = {
          ...usuarios[id],
          saldo: newSaldo,
        };

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

          const indexGanador = utils.getRandomInt(0, 1);

          setCompetidorGanador(
            eventos[eventoActual].participantes[indexGanador]
          );

          const apostarGanador =
            eventos[eventoActual].participantes[indexGanador];

          setCompetidorPerdedor(
            eventos[eventoActual].participantes.find(
              (participante) =>
                participante !==
                eventos[eventoActual].participantes[indexGanador]
            )
          );

          const apostarPerdedor = eventos[eventoActual].participantes.find(
            (participante) =>
              participante !== eventos[eventoActual].participantes[indexGanador]
          );

          console.log("ganador ", apostarGanador);
          console.log("perdedor ", apostarPerdedor);

          const ganadores = todosLosApostadores.filter(
            (apostador) => apostador.opcion === indexGanador
          );
          const monto_grupo_ganador = ganadores
            ? ganadores.reduce(
                (acumulador, ganador) => (acumulador += ganador.cantidad),
                0
              )
            : 0;

          const numeroGanadores = ganadores.length;

          const perdedores = todosLosApostadores.filter(
            (apostador) => apostador.opcion !== indexGanador
          );

          const monto_grupo_perdedor = perdedores
            ? perdedores.reduce(
                (acumulador, perdedor) => (acumulador += perdedor.cantidad),
                0
              )
            : 0;

          const isodate = new Date().toISOString();

          if (ganadores.some((ganador) => ganador.id === usuarios[id].id)) {
            console.log("gano");

            setEventoGanador("Gano");
            setCondicionalGanador(true);
            ganancia({
              monto_grupo_ganador,
              monto_grupo_perdedor,
              dineroApostado,
              numeroGanadores,
              indexGanador,
              apostarGanador,
              isodate,
            });
          } else {
            const nuevoHistorial = addUsuarioApuesta({
              id: historial[historial.length - 1].id + 1,
              idUser: usuarios[id].id,
              victoria: false,
              apuesta: apostarPerdedor,
              ganador: apostarGanador,
              fecha: isodate,
              ganancia: 0,
              perdida: dineroApostado,
            });
            console.log(JSON.stringify(nuevoHistorial));
            dataHandler
              .create(urlHistorial, nuevoHistorial)
              .then(() => {
                setUpdateHistorial(!updateHistorial);
              })
              .catch((error) => {
                console.log(error);
              });

            console.log("perdio");
            setEventoGanador("Perdio");
            setCondicionalGanador(false);
          }
        });
      }
      //Cuando se da click en apostar se resta del saldo el dinero a espera si gano
    } else {
      alert("Debe ingresar un valor");
    }
  };

  const ganancia = ({
    monto_grupo_ganador,
    monto_grupo_perdedor,
    dineroApostado,
    numeroGanadores,
    isodate,
    apostarGanador,
  }) => {
    const monto_total = monto_grupo_ganador + monto_grupo_perdedor;
    const monto_casa_apuesta = monto_total * 0.1;
    const monto_apuesta =
      monto_grupo_ganador === dineroApostado
        ? (monto_total * 0.9) / numeroGanadores
        : monto_total * 0.9;
    const factor_ganancia = dineroApostado / monto_grupo_ganador;
    const monto_ganado = factor_ganancia * monto_apuesta;

    const nuevoHistorial = addUsuarioApuesta({
      id:
        historial.length > 0
          ? historial[historial.length - 1].id + 1
          : historial.length,
      idUser: usuarios[id].id,
      victoria: true,
      apuesta: apostarGanador,
      ganador: apostarGanador,
      fecha: isodate,
      ganancia: monto_ganado,
      perdida: dineroApostado,
    });
    console.log(JSON.stringify(nuevoHistorial));

    dataHandler
      .create(urlHistorial, nuevoHistorial)
      .then(() => {
        setUpdateHistorial(!updateHistorial);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("apostado ", dineroApostado);
    console.log("ganado", monto_ganado.toFixed(2));

    const bancoActual = usuarios[id].banco;
    const saldoActual = usuarios[id].saldo;
    console.log(saldoActual);
    const apostado = Number(inputValue);
    setCantidadGanada(monto_ganado);
    setParaLaCasaDeApuestas(monto_casa_apuesta);
    if (apostado) {
      const newSaldo = saldoActual + monto_ganado;

      const newUser = {
        ...usuarios[id],
        saldo: newSaldo,
      };

      dataHandler
        .update(urlUsuarios, id, newUser)
        .then(() => {
          updateUsuarios ? setUpdateUsuarios(false) : setUpdateUsuarios(false);
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
                    {usuarios.length > 0
                      ? usuarios[id].saldo.toFixed(2)
                      : "0.00"}
                  </div>
                  <div className="d-flex flex-row ">
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
                    <FaDollarSign className="fs-4 mt-2 text_darkHeavyMetal ms-auto" />
                    <input
                      type="text"
                      className="inputApostar rounded_15 shadow "
                      id="inputDinero"
                      placeholder="Ej: 100000"
                      value={inputValue}
                      onChange={onClick}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    {eventos[eventoActual] ? (
                      <Participantes
                        evento={eventos[eventoActual]}
                        setSeleccionEvento={setSeleccionEvento}
                      />
                    ) : null}

                    <button
                      className="btn btn-md rounded_10 text_darkHeavyMetal  bg_gold  shadow ms-auto"
                      onClick={apostar}
                    >
                      Apostar
                    </button>
                  </div>

                  <div className="text-start text_darkHeavyMetal">
                    {apostadores.map((apostador) => (
                      <p key={apostador.id}>
                        Usuario {apostador.nombre} aposto ${apostador.cantidad}{" "}
                        a{" "}
                        {eventos.length > 0 &&
                        apostadores.length > 0 &&
                        eventoActual
                          ? eventos[eventoActual].participantes[
                              apostador.opcion
                            ]
                          : null}
                      </p>
                    ))}

                    {competidorGanador ? (
                      <p className="p-2 bg_darkHeavyMetal text_gold rounded_15">
                        Ganador {competidorGanador}
                      </p>
                    ) : null}

                    {condicionalGanador && eventoGanador && cantidadGanada ? (
                      <p className="p-2 bg_darkHeavyMetal text_greenYellow rounded_15">
                        Felicidades, acaba de ganar ${cantidadGanada.toFixed(2)}
                      </p>
                    ) : !condicionalGanador && eventoGanador ? (
                      <p>Perdio</p>
                    ) : (
                      ""
                    )}

                    {paraLaCasaDeApuestas ? (
                      <p className="p-2 bg_darkHeavyMetal text-white rounded_15">
                        En casa de apuestas ${paraLaCasaDeApuestas.toFixed(2)}
                      </p>
                    ) : null}
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
