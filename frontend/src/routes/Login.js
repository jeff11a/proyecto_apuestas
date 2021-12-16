import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



const Login = (props) => {
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Correo requerido')
      .email('Correo invalido'),
    password: Yup.string()
      .required('Constraseña requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(40, 'La contraseña no debe superar los 40 caracteres')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "La contraseña debe tener por lo menos una mayúscula, una minúscula, un número y un carácter especial"
      )
  });

  const initial = {
    email: "",
    password: "",
    loading: false,
    message: ""
  }

  const [login, setLogin] = useState(initial);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = () => {
    login.loading = true;
    //console.log(login);

    var data = {
      email: login.email,
      password: login.password
    }

    AuthService.login(data)
      .then(
        (data) => {
          console.log(data.roles === 'ROLE_ADMIN');
          if (data.roles === 'ROLE_ADMIN' || data.roles === 'ROLE_INTERNO') {
            history("/dashboard");
          } else if (data.roles === "ROLE_CLIENTE") {
            history("/saldo");
          }
          window.location.reload();
        })
      .catch(
        error => {
          console.log(error)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          
            login.loading = false;
            login.message = resMessage
        }
      );


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
    <>
      <Navbar />

      <div className="container h_100vh" style={{ backgroundColor: '#e0e0e0' }}>
        <div className="card card-body col-md-5 mx-auto mt-4">
          <div className="d-flex justify-content-center">
            <h3 className="card-title" style={{ color: '#8AC500' }}>Login</h3>
          </div>
          <div className="d-flex justify-content-center">
            <span style={{ color: '#8AC500' }}>
              <i className="fas fa-user-circle fa-6x"></i>
            </span>
          </div>
          <div className="register-form mt-4">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-group">
                <label>Correo <span style={{ color: 'red' }}>*</span></label>
                <input
                  name="email"
                  type="email"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={login.email}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <label>Contraseña <span style={{ color: 'red' }}>*</span></label>
                <input
                  name="password"
                  type="password"
                  {...register('password')}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={login.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <div className="d-flex form-group justify-content-center">
                <button type="submit" className="btn btn1 bg_greenPistachio">
                  Login
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
    </>
  );
};
export default Login;
