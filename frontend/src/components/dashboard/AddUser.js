import React, { useState } from "react";
import UserDataService from "../../services/UserService";

const AddUser = () => {
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
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        country: user.country,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        typeUser: user.typeUser
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: response.data.password,
          country: response.data.country,
          phoneNumber: response.data.phoneNumber,
          birthday: response.data.birthday,
          active: response.data.active
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>Solicitud Exitosa!</h4>
        <button className="btn btn-success" onClick={newUser}>
          Guardar
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="firstName">Nombres</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            required
            value={user.firstName}
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
            value={user.lastName}
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
            value={user.email}
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
            value={user.password}
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
            value={user.country}
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
            value={user.phoneNumber}
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
            value={user.birthday}
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
            value={user.typeUser}
            onChange={handleInputChange}
            name="typeUser"
          />
        </div>

        <button onClick={saveUser} className="btn btn-success">
          Crear Usuario
        </button>
      </div>
    )}
  </div>
  );
};

export default AddUser;