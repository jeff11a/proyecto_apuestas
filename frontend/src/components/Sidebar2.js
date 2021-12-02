import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
    faHome,
    faTachometerAlt,
    faUsers,
    faTrophy,
    faDownload 
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Sidebar2 extends Component {
  render() {
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
          <div className="sidebar-brand-text ms-2">Admin</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link mx-0" to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span className="mx-3">Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/users">
            <FontAwesomeIcon icon={faUsers} />
            <span className="mx-3">Usuarios</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/bets">
            <FontAwesomeIcon icon={faTrophy} />
            <span className="mx-3">Eventos de Apuesta</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard/reports">
            <FontAwesomeIcon icon={faDownload} />
            <span className="mx-3">Reportes</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
      </ul>
    );
  }
}
