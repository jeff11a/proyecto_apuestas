import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../../services/UserService";

import { useForm } from 'react-hook-form';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const AddUser = () => {

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Nombre requerido')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(30, 'El nombre no debe superar los 30 caracteres'),
    lastName: Yup.string()
      .required('Apellido requerido')
      .min(3, 'El apellido debe tener al menos 3 caracteres')
      .max(30, 'El apellido no debe superar los 30 caracteres'),
    email: Yup.string()
      .required('Correo requerido')
      .email('Correo invalido'),
    password: Yup.string()
      .required('Constraseña requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(40, 'La contraseña no debe superar los 40 caracteres'),
    country: Yup.string()
      .required('País requerido')
      .max(20, 'País no debe superar los 20 caracteres'),
    phoneNumber: Yup.number()
      .required('Teléfono requerido')
      .positive('El teléfono es un número positivo')
      .min(1000000, 'El teléfono debe tener al menos 7 caracteres')
      .max(999999999999999, 'El teléfono no debe superar los 15 caracteres'),
    birthday: Yup.date()
      .required('Fecha es requerida')
      .max(moment(new Date()).subtract(18, 'y').format('YYYY-MM-DD'), 'Debe ser mayor de edad para registrarse'),
    roles: Yup.string()
  });

  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    birthday: "",
    roles: "Cliente",
    balance: 0,
    bets: [],
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
      roles: user.roles,
      balance: user.balance,
      bets: user.bets,
      active: user.active
    };

    //console.log(data);

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
          balance: response.data.balance,
          roles: response.data.roles,
          bets: response.data.bets,
          active: response.data.active
        });
        setSubmitted(true);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });



  return (

    <div>
      {submitted ? (
        <div>

          <h4>Solicitud Exitosa!</h4>
          <h4>¿Desea agregar otro usuario?</h4>

          <Link className="btn btn-danger me-2" to="/dashboard/users">
            Atras
          </Link>

          <button className="btn btn-success ms-2" onClick={newUser}>
            Agregar
          </button>

        </div>

      ) : (

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Agregar Usuario</h5>
            <div className="register-form">
              <form onSubmit={handleSubmit(saveUser)}>

                <div className="form-group">
                  <label>Nombre <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="firstName"
                    type="text"
                    {...register('firstName')}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    value={user.firstName}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>

                <div className="form-group">
                  <label>Apellido <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="lastName"
                    type="text"
                    {...register('lastName')}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    value={user.lastName}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>

                <div className="form-group">
                  <label>Correo <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="email"
                    type="email"
                    {...register('email')}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={user.email}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="form-group">
                  <label>Contraseña <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="password"
                    type="password"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                  <label>País <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="country"
                    type="text"
                    {...register('country')}
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    value={user.country}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.country?.message}</div>
                </div>

                <div className="form-group">
                  <label>Teléfono <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="phoneNumber"
                    type="number"
                    {...register('phoneNumber')}
                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
                </div>

                <div className="form-group">
                  <label>Fecha de Nacimiento <span style={{color: 'red'}}>*</span></label>
                  <input
                    name="birthday"
                    type="date"
                    {...register('birthday')}
                    className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
                    value={user.birthday}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.birthday?.message}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="roles">Rol <span style={{color: 'red'}}>*</span></label>
                  <select className="form-select" name="roles" id="roles" {...register('roles')} onChange={handleInputChange} value={user.roles}>
                    <option value="Cliente">Cliente</option>
                    <option value="Interno">Interno</option>
                    <option value="Admin">Administrador</option>
                  </select>
                </div>


                <div className="form-group">
                  <Link to="/dashboard/users" className="btn btn-secondary me-2">
                    Atras
                  </Link>
                  <button type="submit" className="btn btn-success">
                    Crear Usuario
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="btn btn-warning float-right"
                    style={{ display: 'none' }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default AddUser;

