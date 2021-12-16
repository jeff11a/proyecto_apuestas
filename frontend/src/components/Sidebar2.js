import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/AuthService";
import EventBus from "../common/EventBus";

import {
  faHome,
  faTachometerAlt,
  faUsers,
  faTrophy,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar2 = () => {

  const [showInternoBoard, setShowInternoBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const obtenerUser = () => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowInternoBoard(user.roles.includes("ROLE_INTERNO"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    setShowInternoBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion ps-3"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/dashboard"
      >
        <div className="sidebar-brand-icon">
          <FontAwesomeIcon icon={faHome} />
        </div>
        {(showAdminBoard || showInternoBoard) &&
          (((currentUser.roles === 'ROLE_INTERNO') && (<div className="sidebar-brand-text ms-2">Interno</div>)) ||
            ((currentUser.roles === 'ROLE_ADMIN') && (<div className="sidebar-brand-text ms-2">Admin</div>))
          )}
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link mx-0" to="/dashboard">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span className="mx-3">Dashboard</span>
        </Link>
      </li>



      {showAdminBoard && (<hr className="sidebar-divider" />) && (
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/users">
            <FontAwesomeIcon icon={faUsers} />
            <span className="mx-3">Usuarios</span>
          </Link>
        </li>
      )}

      <hr className="sidebar-divider" />

      {(showAdminBoard || showInternoBoard) && (
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/bets">
            <FontAwesomeIcon icon={faTrophy} />
            <span className="mx-3">Eventos de Apuesta</span>
          </Link>
        </li>
      )}

      <hr className="sidebar-divider" />

      {(showInternoBoard || showAdminBoard) && (
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/reports">
            <FontAwesomeIcon icon={faDownload} />
            <span className="mx-3">Reportes</span>
          </Link>
        </li>
      )}

      <hr className="sidebar-divider" />
    </ul>
  );

}

export default Sidebar2;
