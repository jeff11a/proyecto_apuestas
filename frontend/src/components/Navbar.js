import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Link, useLocation } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaChessKing, FaChessKnight, FaTrophy } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";
import foto from "../assets/img/undraw_profile.svg";

import EventBus from "../common/EventBus";

const Bar2 = () => {
  const { pathname } = useLocation();

  const [showInternoBoard, setShowInternoBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);



  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowInternoBoard(user.roles.includes("ROLE_INTERNO"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);


  let liTag = "p-0 shadow width_11rem";
  let aTag = "nav-link d-flex flex-column align-items-center btn_bar2 ";

  let litActive = " active_li";
  let aActive = " active_a";

  let liTagEventos = liTag;
  let aTagEventos = aTag;
  let liTagFinalizados = liTag;
  let aTagFinalizados = aTag;

  const changeActiveNavbar = () => {
    switch (pathname) {
      case "/":
        liTagEventos += litActive;
        aTagEventos += aActive;
        break;
      case "/finalizados":
        liTagFinalizados += litActive;
        aTagFinalizados += aActive;
        break;
      case "/dashboard":
        break;

      default:
        liTagEventos = liTag;
        liTagFinalizados = liTag;

        aTagEventos = aTag;
        aTagFinalizados = aTag;
        break;
    }
  };

  changeActiveNavbar();

  return (
    <div className="container  bg_white2" style={{ backgroundColor: '#e0e0e0' }}>
      <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 ">
        <li className={liTagEventos}>
          <Link to="/" className={aTagEventos} style={{ backgroundColor: '#fefefe' }}>
            <FaChessKing className="bi mb-1 fs-4" />
            Eventos disponibles
          </Link>
        </li>
        <li className={liTagFinalizados}>
          <Link to="/finalizados" className={aTagFinalizados} style={{ backgroundColor: '#fefefe' }}>
            <FaChessKnight className="bi mb-1 fs-4" />
            Eventos finalizados
          </Link>
        </li>
        {(showInternoBoard || showAdminBoard) && (
          <li className={liTag}>
            <Link to="/dashboard" className={aTag} style={{ backgroundColor: '#fefefe' }}>
              <BsSpeedometer className="bi mb-1 fs-4" />
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const { pathname } = useLocation();

  let isLogin = true;

  const mostrarBar2 = () => {
    switch (pathname) {
      case "/":
      case "/saldo":
      case "/finalizados":
        isLogin = true;
        break;

      default:
        isLogin = false;
        break;
    }
  }

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
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
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  mostrarBar2();

  return (
    <header className="p-0 row">
      <div className="col-md-12 p-2 bg_darkHeavyMetal text-white px-5">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text_gold text-decoration-none me-lg-auto fs-4 fw-bolder"
          >
            <FaTrophy /> BetPlay
          </Link>

          <div className="d-flex">
            {currentUser ? (
              <div>
                <Link
                  to="/saldo"
                  className="btn btn me-2 bg_bluePrussian text-white text-center btn_bar1"
                >
                  <AiFillDollarCircle className="mb-1 fs-5" /> <span>Saldo</span>
                </Link>
              </div>
            )
              : (
                <div>
                  <Link
                    to="/login"
                    className="btn btn me-2 bg_bluePrussian text-white text-center btn_bar1"
                  >
                    <AiFillDollarCircle className="mb-1 fs-5" /> <span>Saldo</span>
                  </Link>
                </div>
              )
            }
            {!currentUser ? (
              <div>
                <Link
                  to="/login"
                  className="btn me-2 t bg_gold text_darkHeavyMetal  btn_bar1"
                >
                  Login
                </Link>
                <Link
                  to="/registro"
                  className="btn bg_greenPistachio text-white btn_bar1 btn_bar1"
                >
                  Registro
                </Link>
              </div>
            ) : (
              <div>
                <ul className="navbar-nav ml-auto">
                  <div className="topbar-divider d-none d-sm-block"></div>

                  <li className="nav-item dropdown no-arrow">
                    <Link
                      className="nav-link dropdown-toggle p-0 ms-4"
                      to="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#e0e0e0" }}
                    >

                      <span className="mr-2 d-none d-lg-inline small">
                        {currentUser ? (currentUser.firstName + " " + currentUser.lastName) : ""}
                      </span>

                      <img className="img-profile rounded-circle" alt="" src={foto} style={{ height: "40px" }} />
                    </Link>

                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="#" style={{ color: "#4B4B4B" }}>
                          <i className="fas fa-user fa-sm fa-fw mr-2"></i>
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#" style={{ color: "#4B4B4B" }}>
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
                          style={{ color: "#4B4B4B" }}
                        >
                          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                          Cerrar Sesión
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {
        isLogin ? <Bar2 /> : <di></di>
      }

    </header>
  );
};
export default Navbar;
