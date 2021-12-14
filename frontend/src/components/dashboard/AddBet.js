import React, { useState } from "react";
import { Link } from "react-router-dom";
import BetDataService from "../../services/BetService";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const AddBet = () => {

  const validationSchema = Yup.object().shape({
    player1: Yup.string()
      .required('Nombre del Jugador/Equipo requerido')
      .min(3, 'El nombre del Jugador/Equipo debe tener al menos 3 caracteres')
      .max(30, 'El nombre del Jugador/Equipo no debe superar los 30 caracteres'),
    player2: Yup.string()
      .required('Nombre del Jugador/Equipo requerido')
      .min(3, 'El nombre del Jugador/Equipo al menos 3 caracteres')
      .max(30, 'El nombre del Jugador/Equipo no debe superar los 30 caracteres'),
    torneo: Yup.string()
      .required('Torneo requerido')
      .min(3, 'El torneo debe tener al menos 6 caracteres')
      .max(40, 'El torneo no debe superar los 40 caracteres'),
    modalidad: Yup.string(),
    estado: Yup.string()
  });

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div>
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
            <div className="register-form">
              <form onSubmit={handleSubmit(saveBet)}>

                <div className="form-group">
                  <label>Jugador/Equipo 1 <span style={{ color: 'red' }}>*</span></label>
                  <input
                    name="player1"
                    type="text"
                    {...register('player1')}
                    className={`form-control ${errors.player1 ? 'is-invalid' : ''}`}
                    value={bet.player1}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.player1?.message}</div>
                </div>

                <div className="form-group">
                  <label>Jugador/Equipo 2 <span style={{ color: 'red' }}>*</span></label>
                  <input
                    name="player2"
                    type="text"
                    {...register('player2')}
                    className={`form-control ${errors.player2 ? 'is-invalid' : ''}`}
                    value={bet.player2}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.player2?.message}</div>
                </div>

                <div className="form-group">
                  <label>Torneo <span style={{ color: 'red' }}>*</span></label>
                  <input
                    name="torneo"
                    type="text"
                    {...register('torneo')}
                    className={`form-control ${errors.torneo ? 'is-invalid' : ''}`}
                    value={bet.torneo}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.torneo?.message}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="modalidad">Modalidad <span style={{ color: 'red' }}>*</span></label>
                  <select className="form-select" name="modalidad" id="modalidad" {...register('modalidad')} onChange={handleInputChange} value={bet.modalidad}>
                    <option value="clasico">Clasico</option>
                    <option value="rapido">Rápido</option>
                    <option value="relampago">Relámpago</option>
                    <option value="bullet">Bullet</option>
                    <option value="online">En línea</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="typeBet">Estado <span style={{ color: 'red' }}>*</span></label>
                  <select className="form-select" name="estado" id="estado" {...register('estado')} onChange={handleInputChange} value={bet.estado}>
                    <option value="Disponible">Disponible</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Jugando">Jugando</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <Link to="/dashboard/bets" className="btn btn-secondary me-2">
                  Atras
                </Link>
                <button type="submit" className="btn btn-success ms-2">
                  Crear Evento
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn-warning float-right"
                  style={{ display: 'none' }}
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBet;

