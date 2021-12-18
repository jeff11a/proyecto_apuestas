import { FaChess } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import Button from "../components/Button";
import chessboard from "../assets/img/chessboard.jpg";
import { useState } from "react";
import { btnMoney } from "../utils/utilsCss.js";


import BetDataService from "../services/BetService";
import UserDataService from "../services/UserService";

const Game = (props) => {

  const { eventoActual, eventos, usuario, posicion } = props;

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(""); 

  const updateBet = () => {
    BetDataService.update(eventos[posicion].id, eventos[posicion])
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    UserDataService.update(usuario.id, usuario)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const onClick = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const selectChange = (event) => {
    event.preventDefault();
    setSelectValue(event.target.value)
  };

  const fechaActual = () => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }
  }
  

  const apostar = () => {
    const evento = eventos[posicion];
    const saldoActual = usuario.balance;
    const saldo = Number(inputValue);

    if (saldoActual >= saldo) {

      usuario.balance = saldoActual - Number(saldo);
      if(selectValue === evento.player1){
        evento.totalP1 = evento.totalP1 + 1;
        evento.saldoP1 = evento.saldoP1 + saldo;
        evento.saldoTotal = evento.saldoTotal + saldo;

        const apostador = {
          id: usuario.id,
          name: usuario.firstName+" "+usuario.lastName,
          dineroAp: saldo,
          playerAp: selectValue,
          fechaAp: new Date,
        }

        evento.apostadores.push(apostador);
        //updateBet()

        const bet = {
          id: eventoActual,
          value: saldo,
          player: selectValue
        }
  
        usuario.bets.push(bet);
  
        //updateUser();
      }else if(selectValue === evento.player2) {
        evento.totalP2 = evento.totalP2 + 1;
        evento.saldoP2 = evento.saldoP2 + saldo;
        evento.saldoTotal = evento.saldoTotal + saldo;

        const apostador = {
          id: usuario.id,
          name: usuario.firstName+" "+usuario.lastName,
          dineroAp: saldo,
          playerAp: selectValue,
          fechaAp: fechaActual()
        }

        evento.apostadores.push(apostador);
        updateBet()

        const bet = {
          id: eventoActual,
          valueAp: saldo,
          playerAp: selectValue,
          fechaAp: fechaActual()
        }
  
        usuario.bets.push(bet);
  
        updateUser();
      }    
      
      //console.log(usuario);
      //console.log(eventos[posicion]);

    } else {
      console.log(
        "No hay suficiente saldo para realizar la transacción"
      );
    }

    console.log("apostar");
  }




  return (
    <>
      <div className="col-md-10 d-flex align-items-center justify-content-center">
        <div id="chessboard" className="me-4">
          <img
            src={chessboard}
            className="img-thumbnail rounded-circle shadow"
            alt="chessboard"
            id="img_chessboard"
          />
        </div>
        <section className="text-center bg_darkHeavyMetal text_gold rounded_15 shadow p-3">
          <FaChess className="fs-1" />
          <h2 className="display-5 fw-bolder">
            {eventos.length > 0 && eventoActual && posicion
              ? eventos[posicion].player1 + " vs " + eventos[posicion].player2
              : "Seleciona un evento"}
          </h2>


          {eventos.length > 0 && eventoActual ? (
            <button
              className="btn bg_greenPistachio text_darkHeavyMetal rounded_15"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Apostar
            </button>
          ) : (
            ""
          )}

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg_darkHeavyMetal ">
                  <h5
                    className="me-auto fs-4 modal-title text_gold"
                    id="exampleModalLabel"
                  >
                    Hola {usuario ? usuario.firstName : "Jhon"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close bg_gold"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="text-end bg_darkHeavyMetal text_gold p-2 rounded_15">
                    <span>Saldo actual </span>
                    {usuario ? Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(usuario.balance) : "0.00"}
                  </div>
                  <div className="d-flex flex-row mt-3 mb-3">
                    <Button
                      txt="20k"
                      value="20000"
                      onClick={onClick}
                      className={btnMoney}
                    />
                    <Button
                      txt="50k"
                      value="50000"
                      onClick={onClick}
                      className={btnMoney}
                    />
                    <Button
                      txt="100k"
                      value="100000"
                      onClick={onClick}
                      className={btnMoney}
                    />
                    <Button
                      txt="500k"
                      value="500000"
                      onClick={onClick}
                      className={btnMoney}
                    />
                    <FaDollarSign className="fs-4 mt-2" />
                    <input
                      type="text"
                      className="inputApostar rounded_15 shadow "
                      id="inputDinero"
                      placeholder="Ej: 100000"
                      value={inputValue}
                      onChange={onClick}
                    />
                  </div>
                  {eventos.length > 0 ? (<div className="mt-2 mb-4">
                    <select className="form-select" name="jugadores" id="jugadores" value={selectValue} onChange={selectChange}>
                      <option value={eventos[posicion].player1}>{eventos[posicion].player1}</option>
                      <option value={eventos[posicion].player2}>{eventos[posicion].player2}</option>
                    </select>
                  </div>): ""}
                  <button
                    className="btn bg_gold btn1 shadow me-2"
                    onClick={apostar}
                  >
                    Apostar
                  </button>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};
export default Game;

