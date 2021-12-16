import { FaUserAlt, FaLockOpen, FaUserCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import services from "../services/dataHandler";

const Login = (props) => {
  //you save your login in your local storage
  //localStorage.setItem("token", token)
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const loginUrl = "http://localhost:3002/api/user/login";

  const onChangeUser = (event) => {
    event.preventDefault();
    setUser(event.target.value);
    console.log(user);
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    console.log(password);
  };

  const onClick = (event) => {
    event.preventDefault();
    const newUser = {
      userName: user,
      password: password,
    };
    console.log(JSON.stringify(newUser));
    services.create(loginUrl, newUser).then((res) => {
      if (!res.authToken) {
        setLoginStatus(false);
      } else {
        console.log(res);
        localStorage.setItem("authToken", res.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/saldo");
      }
    });
  };

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
                onChange={onChangeUser}
                onBlur={onChangeUser}
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
                onChange={onChangePassword}
                onBlur={onChangePassword}
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
              {/* <Link className="btn btn1 bg_greenPistachio " to="/saldo">
                Login
              </Link> */}
              <button className="btn btn1 bg_greenPistachio " onClick={onClick}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
