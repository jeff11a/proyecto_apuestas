import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import UserDataService from "../../services/UserService";
import { useTable } from "react-table";
import Sidebar2 from "../Sidebar2";
import Navbar2 from "../Navbar2";

const UsersList = (props) => {

  const history = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const usersRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 15, 20];

  usersRef.current = users;

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveUsers = () => {
    const params = getRequestParams(searchName, page, pageSize);

    UserDataService.getAll(params)
      .then((response) => {
        const { users, totalPages } = response.data;

        setUsers(users);
        setCount(totalPages);

        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveUsers, [page, pageSize]);

  const refreshList = () => {
    retrieveUsers();
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    setPage(1);
    retrieveUsers();
  };

  const openUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;
    history(`/dashboard/users/${id}`);
  };

  const deleteUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    UserDataService.remove(id)
      .then((response) => {
        history("/dashboard/users");

        let newUsers = [...usersRef.current];
        newUsers.splice(rowIndex, 1);

        setUsers(newUsers);

      })
      .catch((e) => {
        console.log(e);
      });


  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  const columns = useMemo(
    () => [
      {
        Header: "Nombres",
        accessor: "firstName",
      },
      {
        Header: "Apellidos",
        accessor: "lastName",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Contraseña",
        accessor: "password",
      },
      {
        Header: "País",
        accessor: "country",
      },
      {
        Header: "Teléfono",
        accessor: "phoneNumber",
      },
      {
        Header: "Fecha de Nacimiento",
        accessor: "birthday",
      },
      {
        Header: "Rol",
        accessor: "typeUser",
      },
      {
        Header: "Activo",
        accessor: "active",
        Cell: (props) => {
          return props.value ? "Activo" : "Inactivo";
        },
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action me-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: users,
  });

  return (
    <div id="dashboard">
      <Sidebar2 />
      <div id="content-dashboard" className="d-flex flex-column">
        <div id="content">
          <Navbar2 />
          <div className="container-fluid mt-2">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Gestión de Usuarios</h1>
            </div>
            <div className="row">
              <div className="table-responsive col">
                <div className="list row">
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                        value={searchName}
                        onChange={onChangeSearchName}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={findByName}
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 list">
                    <div className="mt-3">
                      {"Items por página: "}
                      <select className="" onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>

                      <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                      />
                    </div>

                    <table
                      className="table table-striped table-bordered"
                      {...getTableProps()}
                    >
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-8">
                    <button className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#modalDeleteUsers">
                      Remover todos
                    </button>
                    <Link to="/dashboard/addUser" className="btn btn-success mx-2">
                      Añadir Usuario
                    </Link>
                  </div>

                  <div className="modal fade" id="modalDeleteUsers" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Eliminar todos los usuarios</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <h4>¿Desea eliminar todos los usuarios de la lista?</h4>
                          Al realizar esta accion no se podrá recuparar los datos de la tabla.
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" className="btn btn-danger" onClick={removeAllUsers}>Eliminar Usuarios</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
