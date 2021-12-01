import Navbar from "../components/Navbar";
import { FaTrophy } from "react-icons/fa";

const Registro = (props) => {
  return (
    <section className="container-fluid h_100vh">
      <Navbar />
      <form className="col-md-4 mx-auto mt-2 d-flex flex-column align-items-center">
        <FaTrophy className="fs_3-5rem " />
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombres"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Apellidos"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Usuario"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Correo"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Contraseña"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
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
        <button type="submit" className="btn btn1 bg_gold">
          Registrarme
        </button>
      </form>
    </section>
  );
};
export default Registro;
