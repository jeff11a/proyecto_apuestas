import { Link, useLocation } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaChessKing, FaChessKnight, FaTrophy } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";

const Bar2 = () => {
  const { pathname } = useLocation();

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
        <li className={liTag}>
          <Link to="/dashboard" className={aTag} style={{ backgroundColor: '#fefefe' }}>
            <BsSpeedometer className="bi mb-1 fs-4" />
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Navbar = () => {
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

          <div>
            <Link
              to="/saldo"
              className="btn btn me-2 bg_bluePrussian text-white text-center btn_bar1"
            >
              <AiFillDollarCircle className="mb-1 fs-5" /> <span>Saldo</span>
            </Link>
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
        </div>
      </div>
      <Bar2 />
    </header>
  );
};
export default Navbar;
