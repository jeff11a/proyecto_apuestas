import { FaUserAlt, FaLockOpen, FaUserCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = (props) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Correo requerido')
      .email('Correo invalido'),
    password: Yup.string()
      .required('Constraseña requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(40, 'La contraseña no debe superar los 40 caracteres')
  });

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
              <i class="fas fa-user-circle fa-6x"></i>
            </span>
          </div>
          <div className="register-form mt-4">
            <form onSubmit={handleSubmit()}> 
              <div className="form-group">
                <label>Correo <span style={{ color: 'red' }}>*</span></label>
                <input
                  name="email"
                  type="email"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={"user.email"}
                  onChange={"handleInputChange"}
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
                      value={"user.password"}
                      onChange={"handleInputChange"}
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


/* 

<form
            id="submitForm"
            action="../mis_reservas"
            method="get"
            data-parsley-validate=""
            data-parsley-errors-messages-disabled="true"
            _lpchecked="1"
          >
            <div className="height_5rem width_5rem rounded_50 mx-auto rounded-circle bg_purple d-flex justify-content-center align-items-center">
              <FaUserAlt className=" mb-3 fs_3-5rem" />
            </div>
            <div className="form-group required d-flex flex-row align-items-center">
              <label className="fs_2-5rem align-self-center pr-1 ">
                {" "}
                <FaUserCheck className="fs-2 me-1" />
              </label>

              <input
                type="text"
                className="form-control text-lowercase rounded_15"
                id="username"
                required=""
                name="username"
                placeholder="Correo"
              />
            </div>
            <div className="form-group required d-flex flex-row align-items-center">
              <label className="fs_2-5rem align-self-center pr-1">
                {" "}
                <FaLockOpen className="fs-3 me-2" />
              </label>

              <input
                type="password"
                className="form-control rounded_15"
                required=""
                id="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group pt-1 d-flex flex-column">
              <a className="text-md-left border-link text_purple" href="/#">
                {" "}
                Olvidé mi contraseña{" "}
              </a>
              <br />
            </div>
            <div className="d-flex justify-content-center">
              <Link className="btn btn1 bg_greenPistachio " to="/saldo">
                Login
              </Link>
            </div>
          </form>

*/