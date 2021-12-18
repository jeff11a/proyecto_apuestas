import { FaChessBoard } from "react-icons/fa";

const Sidebar = (props) => {
  const { eventos , onEventoActualChange, posicionActual } = props;

  const onClick = (evento) => {
    evento.preventDefault();
    onEventoActualChange(evento.target.getAttribute("value1"));
    posicionActual(evento.target.getAttribute("value2"));
  };

  return (
    <div className="rounded_15 sidebar col-md-2 d-flex flex-column p-3 text-white bg_darkHeavyMetal radius_20">
      <a
        href="/#"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <FaChessBoard className="mb-3 fs_1-5rem text_gold" />

        <span className="nav-item fs_1-5rem mx-2 text_gold"> Eventos</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {eventos.length
          ? eventos.map((evento, i) => (
            <li className="nav-item" key={i}>
              <a
                href="/#"
                className="nav-link text-white d-flex align-items-center"
                onClick={onClick}
                value1={evento.id}
                value2={i}
                key={evento.id}
              >
                {evento.player1+" vs "+evento.player2}
              </a>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
};

export default Sidebar;
