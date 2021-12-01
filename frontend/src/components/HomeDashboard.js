import React, { Component } from "react";
import {
  faUsers,
  faTrophy,
  faDice,
  faChess,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./Chart";
import { Link } from "react-router-dom";

export default class HomeDashboard extends Component {
  render() {
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
                      1350
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faUsers} size="2x" />
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
                      25
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faDice} size="2x" />
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
                      50
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faChess} size="2x" />
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
                      75
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faTrophy} size="2x" />
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
                    <FontAwesomeIcon icon={faEllipsisV} />
                    {/* <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> */}
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

              <div class="card-body">
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
