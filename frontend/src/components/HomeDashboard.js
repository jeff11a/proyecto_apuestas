import React, { useState } from "react";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import UserDataService from "../services/UserService";
import BetDataService from "../services/BetService";


const HomeDashboard = (props) => { 

    const [contUser, setContUser] = useState(0);
    const [finished, setFinished] = useState(0);
    const [active, setActive] = useState(0);
    const [contBet, setContBet] = useState(0)

    const countUsers = () => {
      UserDataService.countUser()
        .then((result) => {
          console.log(result.data.cont);
          setContUser(result.data.cont);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const countBetFinished = () => {
      BetDataService.countFinished()
        .then((result) => {
          console.log(result.data.cont);
          setFinished(result.data.cont);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const countBetActive = () => {
      BetDataService.countActive()
        .then((result) => {
          console.log(result.data.cont);
          setActive(result.data.cont);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const countBet = () => {
      BetDataService.countAll()
        .then((result) => {
          console.log(result.data.cont);
          setContBet(result.data.cont);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    countUsers();
    countBetFinished();
    countBetActive();
    countBet();

    return (
      <div className="container-fluid mt-2">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Usuarios
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      { contUser }
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Eventos Activos
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      { active }
                    </div>
                  </div>
                  <div className="col-auto">
                  <i className="fas fa-dice fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Eventos Terminados
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      { finished }
                    </div>
                  </div>
                  <div className="col-auto">
                  <i className="fas fa-chess fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Eventos
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      { contBet }
                    </div>
                  </div>
                  <div className="col-auto">
                  <i className="fas fa-trophy fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Earnings Overview
                </h6>
                <div className="dropdown no-arrow">
                  <Link
                    className="dropdown-toggle"
                    to=""
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Dropdown Header:</div>
                    <Link className="dropdown-item" to="">
                      Action
                    </Link>
                    <Link className="dropdown-item" to="">
                      Another action
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="">
                      Something else here
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

};

export default HomeDashboard;
