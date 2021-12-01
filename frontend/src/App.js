import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar1 from "./components/Sidebar1.js";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import dataHandler from "./services/dataHandler";

function App() {
  const [eventos, setEventos] = useState([]);
  const [eventoActual, setEventoActual] = useState();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    dataHandler
      .getAll("http://localhost:3001/usuarios")
      .then((values) => setUsuarios(values));
  }, []);

  useEffect(() => {
    dataHandler
      .getAll("http://localhost:3001/eventos")
      .then((values) => setEventos(values));
  }, []);

  return (
    <div className="h_100vh">
      <Navbar />
      <div className="row">
        <Sidebar1
          eventos={eventos}
          eventoActual={eventoActual}
          onEventoActualChange={setEventoActual}
        />
        <Game
          eventos={eventos}
          eventoActual={eventoActual}
          usuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      </div>
    </div>
  );
}

export default App;
