import "./styles/register.css";
import { Link } from 'react-router-dom';


import imgLogin from "../../assets/images/profile-img.png";

const Register = () => {
  return (
    <>
      <div className="container-main">
        <div className="container-login">
          <div className="container-title">
            <div>
              <h2 className="login-title">Registro</h2>
              <h3 className="login-subtitle">Cardio Track</h3>
            </div>
            <img className="img-profile" src={imgLogin} alt="" />
          </div>

          <form className="container-form">
            <div className="container-form-card">
              <div className="form-label" htmlFor="">
                Email
              </div>
              <input className="form-input" type="text" />
            </div>
            <div className="container-form-card">
              <div className="form-label" htmlFor="">
                Contraseña
              </div>
              <input className="form-input" type="text" />
            </div>

            <button className="button-login">Ingresar</button>
          </form>

          <div className="container-text-register">
            <p>
              ¿Tienes una cuenta?{" "}
              <Link to='/login' className="span-text-register">Iniciar sesión</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
