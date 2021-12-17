import Navbar from "../components/Navbar";
import { FaTrophy } from "react-icons/fa";
import { useState, useEffect } from "react";
import services from "../services/dataHandler";
import utils from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Registro = (props) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [dateBirth, setDateBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  const registerUrl = "http://localhost:3002/api/user/register";

  const onChangeName = (event) => {
    event.preventDefault();
    setName(event.target.value);
    console.log(name);
  };

  const onChangeUser = (event) => {
    event.preventDefault();
    setUser(event.target.value);
    console.log(user);
  };

  const onChangeDateBirth = (event) => {
    event.preventDefault();
    setDateBirth(event.target.value);
    console.log(dateBirth);
    console.log("age ", utils.getAge(dateBirth));
  };

  const onChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    console.log(email);
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    console.log(password);
  };

  const onClick = (event) => {
    event.preventDefault();
    const newAge = utils.getAge(dateBirth);
    console.log("age ", newAge);
    setAge(newAge);

    const newUser = {
      name: name,
      userName: user,
      email: email,
      password: password,
      dateBirth: dateBirth,
      age: newAge,
    };
    console.log(JSON.stringify(newUser));
    services.create(registerUrl, newUser).then(() => {
      navigate("/login");
    });
  };

  return (
    <section className="container-fluid h_100vh">
      <Navbar />
      <form className="col-md-4 mx-auto mt-2 d-flex flex-column align-items-center">
        <FaTrophy className="fs_3-5rem mb-2" />
        <div className="mb-3 input-group">
          <span className="input-group-text width_7rem">Nombre </span>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={name}
            onChange={onChangeName}
            onBlur={onChangeName}
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text width_7rem ">Usuario </span>
          <input
            type="text"
            placeholder="Usuario"
            className="form-control"
            id="exampleInputEmail1"
            value={user}
            onChange={onChangeUser}
            onBlur={onChangeUser}
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text width_7rem">Nacimiento </span>
          <input
            type="date"
            className="form-control"
            id="exampleInputDate"
            vvalue={dateBirth}
            onChange={onChangeDateBirth}
            onBlur={onChangeDateBirth}
          />
        </div>
        <div className="mb-3 d-flex input-group">
          <span className="input-group-text width_7rem">correo </span>
          <input
            type="email"
            placeholder="Correo"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={onChangeEmail}
            onBlur={onChangeEmail}
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text width_7rem">Contraseña </span>
          <input
            placeholder="Contraseña"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={onChangePassword}
            onBlur={onChangePassword}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">
            Acepto los terminos y condiciones
          </label>
        </div>
        <button type="submit" className="btn btn1 bg_gold" onClick={onClick}>
          Registrarme
        </button>
      </form>
    </section>
  );
};
export default Registro;
