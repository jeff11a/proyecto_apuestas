import React, { useState } from "react";
import { Link } from "react-router-dom";
import BetDataService from "../../services/BetService";


const AddBet = () => {

  const initialBetState = {
    id: null,
    player1: "",
    player2: "",
    torneo: "",
    modalidad: "Clasico",
    totalP1: 0,
    saldoP1: 0,
    totalP2: 0,
    saldoP2: 0,
    saldoTotal: 0,
    estado: "Disponible",
    apostadores: [],
    ganador: "",
    activo: false
  };

  const [bet, setBet] = useState(initialBetState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBet({ ...bet, [name]: value });
  };

  const saveBet = () => {

    var data = {
      player1: bet.player1,
      player2: bet.player2,
      torneo: bet.torneo,
      modalidad: bet.modalidad,
      totalP1: bet.totalP1,
      saldoP1: bet.saldoP1,
      totalP2: bet.totalP2,
      saldoP2: bet.saldoP2,
      saldoTotal: bet.saldoTotal,
      estado: bet.estado,
      apostadores: bet.apostadores,
      ganador: bet.ganador
    };

    BetDataService.create(data)
      .then(response => {
        setBet({
          id: response.data.id,
          player1: response.data.player1,
          player2: response.data.player2,
          torneo: response.data.torneo,
          modalidad: response.data.modalidad,
          totalP1: response.data.totalP1,
          saldoP1: response.data.saldoP1,
          totalP2: response.data.totalP2,
          saldoP2: response.data.saldoP2,
          saldoTotal: response.data.saldoTotal,
          estado: response.data.estado,
          apostadores: response.data.apostadores,
          ganador: response.data.ganador,
          activo: response.data.activo
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBet = () => {
    setBet(initialBetState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Solicitud Exitosa!</h4>
          <h4>¿Desea agregar otro evento de apuesta?</h4>
          <Link className="btn btn-danger me-2" to="/dashboard/bets">
            Atras
          </Link>
          <button className="btn btn-success ms-2" onClick={newBet}>
            Agregar
          </button>
        </div>

      ) : (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Agregar Evento de Apuesta</h5>
            <div>
              <div className="form-group">
                <label htmlFor="player1">Jugador/Equipo 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="player1"
                  required
                  value={bet.player1}
                  onChange={handleInputChange}
                  name="player1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="player2">Jugador/Equipo 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="player2"
                  required
                  value={bet.player2}
                  onChange={handleInputChange}
                  name="player2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="torneo">Torneo</label>
                <input
                  type="text"
                  className="form-control"
                  id="torneo"
                  required
                  value={bet.torneo}
                  onChange={handleInputChange}
                  name="torneo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modalidad">Modalidad</label>
                <select className="form-select" name="modalidad" id="modalidad" onChange={handleInputChange} value={bet.modalidad}>
                  <option value="clasico">Clasico</option>
                  <option value="rapido">Rápido</option>
                  <option value="relampago">Relámpago</option>
                  <option value="bullet">Bullet</option>
                  <option value="online">En línea</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="typeBet">Estado</label>
                <select className="form-select" name="estado" id="estado" onChange={handleInputChange} value={bet.estado}>
                  <option value="Disponible">Disponible</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Jugando">Jugando</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <Link to="/dashboard/bets" className="btn btn-secondary me-2">
                Atras
              </Link>
              <button onClick={saveBet} className="btn btn-success ms-2">
                Crear Evento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBet;

