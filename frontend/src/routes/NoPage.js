import React, { Component } from 'react'

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default class NoPage extends Component {
    render() {
        return (
            <>
               <Navbar/>
               <div className="container-fluid mt-2">
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <h1 className="h3 mt-4" style={{textAlign: "center", fontSize: "2.5em"}}>Página no encontrada</h1>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <p style={{textAlign: "center", fontSize: "1.5em"}}>La página que intentas solicitar no esta en el servidor (Error 404). <br/>
                    Prueba nueva mente en nuestra homepage <Link to="/">betplay.com</Link></p>
                </div>
            </div>
            </>
        )
    }
}
