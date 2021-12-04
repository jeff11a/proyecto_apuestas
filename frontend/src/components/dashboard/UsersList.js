import React, { useState, useEffect, useMemo, useRef } from "react";
import UserDataService from "../../services/UserService";
import { useTable } from "react-table";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const usersRef = useRef();

  usersRef.current = users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchEmail = (e) => {
    const searchEmail = e.target.value;
    setSearchEmail(searchEmail);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const findByEmail = () => {
    UserDataService.findByEmail(searchEmail)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    props.history.push("/users/" + id);
  };

  const deleteUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    UserDataService.remove(id)
      .then((response) => {
        props.history.push("/users");

        let newUsers = [...usersRef.current];
        newUsers.splice(rowIndex, 1);

        setUsers(newUsers);
      })
      .catch((e) => {
        console.log(e);
      });
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
        Header: "Tipo de Usuario",
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
                <i className="far fa-edit action mr-2"></i>
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
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Email"
            value={searchEmail}
            onChange={onChangeSearchEmail}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmail}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
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
        <button className="btn btn-sm btn-danger" onClick={removeAllUsers}>
          Remover todos
        </button>
      </div>
    </div>
  );
};

export default UsersList;
