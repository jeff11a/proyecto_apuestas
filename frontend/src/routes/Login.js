import { FaUserAlt, FaLockOpen, FaUserCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <>
      <Navbar />

      <div className="container h_100vh ">
        <div className="card card-body col-md-5 mx-auto mt-5">
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
        </div>
      </div>
    </>
  );
};
export default Login;
