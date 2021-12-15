import React, { Component } from 'react'
import Navbar from "../components/Navbar";

export default class NoPage extends Component {
    render() {
        return (
            <>
               <Navbar/>
               <div className="container-fluid mt-2">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Página no encontrada</h1>
                </div>
                <div className="row">
                    
                </div>
            </div>
            </>
        )
    }
}
