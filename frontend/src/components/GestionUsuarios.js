import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import UserList from "./dashboard/UsersList";

export default class GestionUsuarios extends Component {
    render() { 
        return (
            <div className="container-fluid mt-2">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Gestión de Usuarios</h1>
                </div>
                <div className="row">
                    <div className="table-responsive col">
                        <UserList></UserList>  
                        <Link to="/dashboard/addUser" className="btn btn-success">
                            Añadir Usuario
                        </Link>       
                    </div>
                </div>
            </div>
        )
    }
}
