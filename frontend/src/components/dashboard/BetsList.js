import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BetDataService from "../../services/BetService";
import { useTable } from "react-table";
import Sidebar2 from "../Sidebar2";
import Navbar2 from "../Navbar2";

const BetsList = (props) => {

  const history = useNavigate();

  const [bets, setBets] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState("");
  const betsRef = useRef();

  betsRef.current = bets;

  useEffect(() => {
    retrieveBets();
  }, []);

  const onChangeSearchPlayer = (e) => {
    const searchPlayer = e.target.value;
    setSearchPlayer(searchPlayer);
  };

  const retrieveBets = () => {
    BetDataService.getAll()
      .then((response) => {
        setBets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBets();
  };

  const removeAllBets = () => {
    BetDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByPlayer = () => {
    BetDataService.findByPlayer(searchPlayer)
      .then((response) => {
        setBets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openBet = (rowIndex) => {
    const id = betsRef.current[rowIndex].id;
    history(`/dashboard/bets/${id}`);
  };

  const deleteBet = (rowIndex) => {
    const id = betsRef.current[rowIndex].id;

    BetDataService.remove(id)
      .then((response) => {
        history("/dashboard/bets");

        let newBets = [...betsRef.current];
        newBets.splice(rowIndex, 1);

        setBets(newBets);

      })
      .catch((e) => {
        console.log(e);
      });


  };

  const columns = useMemo(
    () => [
      {
        Header: "Jugador 1",
        accessor: "player1",
      },
      {
        Header: "Jugador 2",
        accessor: "player2",
      },
      {
        Header: "Torneo",
        accessor: "torneo",
      },
      {
        Header: "Apuestas J1",
        accessor: "totalP1",
      },
      {
        Header: "Saldo J1",
        accessor: "saldoP1",
      },
      {
        Header: "Apuesta J2",
        accessor: "totalP2",
      },
      {
        Header: "Saldo J2",
        accessor: "saldoP2",
      },
      {
        Header: "Total",
        accessor: "saldoTotal",
      },
      {
        Header: "Estado",
        accessor: "estado",
      },
      {
        Header: "Ganador",
        accessor: "ganador",
      },
      {
        Header: "Activo",
        accessor: "activo",
        Cell: (props) => {
          return props.value ? "Activo" : "Inactivo";
        },
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openBet(rowIdx)}>
                <i className="far fa-edit action me-2"></i>
              </span>

              <span onClick={() => deleteBet(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: bets,
  });

  return (
    <div id="dashboard">
      <Sidebar2 />
      <div id="content-dashboard" className="d-flex flex-column">
        <div id="content">
          <Navbar2 />
          <div className="container-fluid mt-2">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Gestión de Eventos de Apuesta</h1>
            </div>
            <div className="row">
              <div className="table-responsive col">
                <div className="list row">
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por player"
                        value={searchPlayer}
                        onChange={onChangeSearchPlayer}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={findByPlayer}
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 list">
                    <table
                      className="table table-striped table-bordered"
                      {...getTableProps()}
                    >
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-8">
                    <button className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#modalDeleteBets">
                      Remover todos
                    </button>
                    <Link to="/dashboard/addBet" className="btn btn-success mx-2">
                      Añadir Evento
                    </Link>
                  </div>

                  <div className="modal fade" id="modalDeleteBets" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Eliminar todos los Eventos</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <h4>¿Desea eliminar todos los eventos de la tabla?</h4>
                          Al realizar esta accion no se podrá recuparar los datos de la tabla.
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" className="btn btn-danger" onClick={removeAllBets}>Eliminar Eventos</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetsList;
