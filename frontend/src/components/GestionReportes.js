import React, { Component } from 'react'
import Reports from './dashboard/Reports'

export default class GestionReportes extends Component {
    render() {
        return (
            <div className="container-fluid mt-2">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Reportes</h1>
                </div>
                <div className="row">
                    <Reports/>
                </div>
            </div>
        )
    }
}
