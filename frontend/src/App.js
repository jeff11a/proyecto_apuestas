import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar1 from "./components/Sidebar1.js";
import Game from "./components/Game";
import { useState, useEffect, useRef } from "react";


import BetDataService from "./services/BetService";
import AuthService from "./services/AuthService";
import UserDataService from "./services/UserService";

function App() {
  const [eventoActual, setEventoActual] = useState();
  const [posicion, setPosicion] = useState(0);

  const [bets, setBets] = useState([]);
  const betsRef = useRef();

  betsRef.current = bets;

  const getRequestParams = () => {
    let params = {};   
    params["player"] = "";  
    return params;
  };

  const retrieveBets = () => {
    const params = getRequestParams();

    BetDataService.getAllActive(params)
      .then((response) => {
        const { bets } = response.data;
        setBets(bets);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveBets, []);
  
  const [currentUser, setCurrentUser] = useState(undefined);

  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    balance: 0,
    banco: 0,
    birthday: "",
    roles: "",
    active: true
  };

  const [user, setUser] = useState(initialUserState);


  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setUser(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const obtenerUser = () => {
    const usuario = AuthService.getCurrentUser();

    if (usuario) {
      setCurrentUser(usuario);
      getUser(usuario.id);
    }
  }

  useEffect(obtenerUser, []);

  return (
    <div className="h_100vh">
      <Navbar />
      <div className="row">
        <Sidebar1
          eventos={bets}
          eventoActual={eventoActual}
          posicionActual={setPosicion}
          onEventoActualChange={setEventoActual}
        />
        <Game
          eventos={bets}
          eventoActual={eventoActual}          
          posicion={posicion}
          usuario={user}
          setUsuario={setUser}
        />
      </div>
    </div>
  );
}

export default App;
