import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BetDataService from "../../services/BetService";
import Sidebar2 from "../Sidebar2";
import Navbar2 from "../Navbar2";

const Bet = (props) => {
    const { id } = useParams();
    const history = useNavigate();

    const initialBetState = {
        id: null,
        player1: "",
        player2: "",
        torneo: "",
        modalidad: "",
        totalP1: 0,
        saldoP1: 0,
        totalP2: 0,
        saldoP2: 0,
        saldoTotal: 0,
        estado: "",
        apostadores: [],
        ganador: "",
        activo: true
    };
    const [currentBet, setCurrentBet] = useState(initialBetState);
    const [message, setMessage] = useState("");

    const getBet = id => {
        BetDataService.get(id)
            .then(response => {
                setCurrentBet(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getBet(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBet({ ...currentBet, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentBet.id,
            player1: currentBet.player1,
            player2: currentBet.player2,
            torneo: currentBet.torneo,
            modalidad: currentBet.modalidad,
            totalP1: currentBet.totalP1,
            saldoP1: currentBet.saldoP1,
            totalP2: currentBet.totalP2,
            saldoP2: currentBet.saldoP2,
            saldoTotal: currentBet.saldoTotal,
            estado: currentBet.estado,
            apostadores: currentBet.apostadores,
            ganador: currentBet.ganador,
            activo: status
        };

        BetDataService.update(currentBet.id, data)
            .then(response => {
                setCurrentBet({ ...currentBet, activo: status });
                console.log(response.data);
                setMessage("¡El estado se actualizó correctamente!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateBet = () => {
        BetDataService.update(currentBet.id, currentBet)
            .then(response => {
                console.log(response.data);
                setMessage("¡El evento de apuesta se actualizó correctamente!");
                history("/dashboard/bets");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteBet = () => {
        BetDataService.remove(currentBet.id)
            .then(response => {
                console.log(response.data);
                history("/dashboard/bets");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div id="dashboard">
            <Sidebar2></Sidebar2>
            <div id="content-dashboard" className="d-flex flex-column">
                <div id="content">
                    <Navbar2></Navbar2>
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">

                            <div>
                                {currentBet ? (
                                    <div className="edit-form">
                                        <h4>Evento de Apuesta</h4>
                                        <form>

                                            <div className="form-group">
                                                <label htmlFor="player1">Jugador/Equipo 1</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="player1"
                                                    required
                                                    value={currentBet.player1}
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
                                                    value={currentBet.player2}
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
                                                    value={currentBet.torneo}
                                                    onChange={handleInputChange}
                                                    name="torneo"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="modalidad">Modalidad</label>
                                                <select className="form-select" name="modalidad" id="modalidad" onChange={handleInputChange} value={currentBet.modalidad}>
                                                    <option value="Clasico">Clasico</option>
                                                    <option value="Rapido">Rápido</option>
                                                    <option value="Relampago">Relámpago</option>
                                                    <option value="Bullet">Bullet</option>
                                                    <option value="Online">En línea</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="typeBet">Estado</label>
                                                <select className="form-select" name="estado" id="estado" onChange={handleInputChange} value={currentBet.estado}>
                                                    <option value="Disponible">Disponible</option>
                                                    <option value="Finalizado">Finalizado</option>
                                                    <option value="Jugando">Jugando</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>
                                                    <strong>Activado:</strong>
                                                </label>
                                                {currentBet.activo ? "Activo" : "Inactivo"}
                                            </div>
                                        </form>

                                        {currentBet.activo ? (
                                            <button
                                                className="btn btn-primary mr-2"
                                                onClick={() => updatePublished(false)}
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => updatePublished(true)}
                                            >
                                                Activar
                                            </button>
                                        )}

                                        <button className="btn btn-danger me-2" onClick={deleteBet}>
                                            Eliminar
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            onClick={updateBet}
                                        >
                                            Actualizar
                                        </button>
                                        <p>{message}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Por favor haga clic en un evento de apuesta...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bet;
