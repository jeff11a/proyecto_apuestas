import React, { Component } from "react";
import { Link } from "react-router-dom";
import foto from "../assets/img/undraw_profile.svg";

import {
  faBars,
  faCogs,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Navbar2 extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Link className="navbar-brand" to="/dashboard">
          BETPLAY
        </Link>

        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          <li className="nav-item dropdown no-arrow">
            <Link
              className="nav-link dropdown-toggle"
              to=""
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                Oscar Pérez
              </span>
              <img className="img-profile rounded-circle" alt="" src={foto} />
            </Link>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="#">
                <FontAwesomeIcon icon={faUser} />
                {/* <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> */}
                Perfil
              </Link>
              <Link className="dropdown-item" to="">
                <FontAwesomeIcon icon={faCogs} />
                {/* <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> */}
                Configuraciones
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                to=""
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {/* <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> */}
                Cerrar Sesión
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">                    
                    <Link className="navbar-brand" to="/">BETPLAY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">                        
                        <Link className="btn  btn-success ms-2" to="/login">cerrar sesión</Link>
                    </div>
                </div>
            </nav>  */
