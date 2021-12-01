import { BsSpeedometer } from "react-icons/bs";
import { RiSwordLine } from "react-icons/ri";
import { FaHome, FaUsers, FaChess, FaTrophy } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h_80vh rounded_15 col-md-2 d-flex flex-column p-3 text-white bg_darkHeavyMetal radius_20">
      <a
        href="/#"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <BsSpeedometer className="mb-1 fs_1-5rem text_gold" />

        <span className="nav-item fs_1-5rem mx-2 text_gold"> Dashboard</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item d-flex align-items-center">
          <FaHome />
          <a
            href="/#"
            className="nav-link text-white d-flex align-items-center"
          >
            Inicio
          </a>
        </li>

        <li className="nav-item d-flex align-items-center">
          <FaUsers />
          <a
            href="/#"
            className="nav-link text-white d-flex align-items-center"
          >
            Usuarios
          </a>
        </li>

        <li className="nav-item d-flex align-items-center border_bottom_gold text_gold">
          <FaChess className="" />

          <a href="/#" className="nav-link d-flex align-items-center text_gold">
            Eventos
          </a>
        </li>

        <li className="nav-item d-flex align-items-center">
          <RiSwordLine />
          <a
            href="/#"
            className="nav-link text-white d-flex align-items-center"
          >
            Competidores
          </a>
        </li>

        <li className="nav-item d-flex align-items-center">
          <FaTrophy />
          <a
            href="/#"
            className="nav-link text-white d-flex align-items-center"
          >
            Ganadores
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
