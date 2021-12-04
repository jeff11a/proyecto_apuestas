import React, { useState, useEffect } from "react";
import UserDataService from "../../services/UserService";

const User = props => {
  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    birthday: "",
    typeUser: "C",
    active: true
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updatePublished = status => {
    var data = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: currentUser.password,
        country: currentUser.country,
        phoneNumber: currentUser.phoneNumber,
        birthday: currentUser.birthday,
        active: status
    };

    UserDataService.update(currentUser.id, data)
      .then(response => {
        setCurrentUser({ ...currentUser, active: status });
        console.log(response.data);
        setMessage("¡El estado se actualizó correctamente!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("¡El usuario se actualizó correctamente!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>Usuario</h4>
          <form>
            
            <div className="form-group">
                <label htmlFor="firstName">Nombres</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                    value={currentUser.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Apellidos</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required
                    value={currentUser.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={currentUser.email}
                    onChange={handleInputChange}
                    name="email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={currentUser.password}
                    onChange={handleInputChange}
                    name="password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="country">País</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    required
                    value={currentUser.country}
                    onChange={handleInputChange}
                    name="country"
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Teléfono</label>
                <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    required
                    value={currentUser.phoneNumber}
                    onChange={handleInputChange}
                    name="phoneNumber"
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthday">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    required
                    value={currentUser.birthday}
                    onChange={handleInputChange}
                    name="birthday"
                />
            </div>

            <div className="form-group">
                <label htmlFor="typeUser">Tipo de usuario</label>
                <input
                    type="text"
                    className="form-control"
                    id="typeUser"
                    required
                    value={currentUser.typeUser}
                    onChange={handleInputChange}
                    name="typeUser"
                />
            </div>

            <div className="form-group">
              <label>
                <strong>Activado:</strong>
              </label>
              {currentUser.active ? "Activo" : "Inactivo"}
            </div>
          </form>

          {currentUser.active ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Desactivar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Activar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Eliminar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor haga clic en un usuario...</p>
        </div>
      )}
    </div>
  );
};

export default User;
