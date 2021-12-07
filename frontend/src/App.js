import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar1 from "./components/Sidebar1.js";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import dataHandler from "./services/dataHandler";

function App() {
  const urlUsuarios = "http://localhost:3001/usuarios";
  const urlHistorial = "http://localhost:3001/historial";
  const urlEventos = "http://localhost:3001/eventos";
  const [eventos, setEventos] = useState([]);
  const [eventoActual, setEventoActual] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [historial, setHistorial] = useState();

  useEffect(() => {
    dataHandler.getAll(urlUsuarios).then((values) => setUsuarios(values));
  }, []);

  useEffect(() => {
    dataHandler.getAll(urlHistorial).then((values) => {
      setHistorial(values);
    });
  }, []);

  useEffect(() => {
    dataHandler.getAll(urlEventos).then((values) => setEventos(values));
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
          historial={historial}
          setHistorial={setHistorial}
          setUsuarios={setUsuarios}
          urlEventos={urlEventos}
          urlUsuarios={urlUsuarios}
          urlHistorial={urlHistorial}
        />
      </div>
    </div>
  );
}

export default App;
