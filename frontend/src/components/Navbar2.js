import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import foto from "../assets/img/undraw_profile.svg";

import {
  faBars
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../services/AuthService";
import EventBus from "../common/EventBus";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Navbar2 = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    const obtenerUser = () => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setCurrentUser(user);
      }
      
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }

    useEffect(obtenerUser, []);

    const logOut = () => {
      AuthService.logout();
      setCurrentUser(undefined);
    };
  
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
              to="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {currentUser ? (
                <span className="mr-2 d-none d-lg-inline small">
                { currentUser.firstName+" "+currentUser.lastName }
              </span>
              ) : <span className="mr-2 d-none d-lg-inline small">Usuario</span>}
              <img className="img-profile rounded-circle" alt="" src={foto} />
            </Link>

            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="userDropdown"
            >
              <li>
                <Link className="dropdown-item" to="#" style={{color: "#4B4B4B"}}>
                  <i className="fas fa-user fa-sm fa-fw mr-2"></i>
                  Perfil
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#" style={{color: "#4B4B4B"}}>
                  <i className="fas fa-cogs fa-sm fa-fw mr-2"></i>
                  Configuraciones
                </Link>
              </li>
              <div className="dropdown-divider"></div>
              <li>
              <Link
                className="dropdown-item"
                to="/login"
                onClick={logOut}
                style={{color: "#4B4B4B"}}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                Cerrar Sesión
              </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );

}

export default Navbar2;

