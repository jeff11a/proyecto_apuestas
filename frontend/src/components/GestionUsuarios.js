import React, { Component } from 'react'
import DataTable from "./DatatableBase";

import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const columns = [
    {
        name: 'Nombres',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Apellidos',
        selector: row => row.lastName,
        sortable: true,
    },
    {
        name: 'Correo',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'País',
        selector: row => row.country,
        sortable: true,
    },
    {
        name: 'Teléfono',
        selector: row => row.phoneNumber,
        sortable: true,
    },
    {
        name: 'Fecha de Nacimiento',
        selector: row => row.birthday,
        sortable: true,
    },
    {
        name: 'Tipo de Usuario',
        selector: row => row.typeUser,
        sortable: true,
    }
];

const data = [
    {
        id: 1,
        firstName: 'Felipe',
        lastName: 'Lopez',
        email: 'felipe@email.com',
        country: 'Colombia',
        phoneNumber: 30012312341,
        birthday: '1998-03-12',
        typeUser: 'C'
    },
    {
        id: 2,
        firstName: 'Oscar Eduardo',
        lastName: 'Pérez Sampayo',
        email: 'oscar@email.com',
        country: 'Colombia',
        phoneNumber: 30012312342,
        birthday: '1997-01-12',
        typeUser: 'A'
    },
    {
        id: 3,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 4,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 5,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 6,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 7,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 8,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 9,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 10,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    },
    {
        id: 11,
        firstName: 'Diana',
        lastName: 'Daza',
        email: 'diana@email.com',
        country: 'Colombia',
        phoneNumber: 30012312343,
        birthday: '1996-05-24',
        typeUser: 'I'
    }
]


const tableData = {
        columns,
        data,
};

export default class GestionUsuarios extends Component {
    render() {       
        
        return (
            <div className="container-fluid mt-2">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Gestión de Usuarios</h1>
                </div>
                <div className="row">
                    <div className="table-responsive col">
                        <DataTableExtensions {...tableData}>
                            <DataTable columns={columns} data={data}/>
                        </DataTableExtensions>                     
                    </div>
                </div>
            </div>
        )
    }
}
