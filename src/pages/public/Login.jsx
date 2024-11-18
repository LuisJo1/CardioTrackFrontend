import { Link } from "react-router-dom";
import "./styles/login.css";

/* images */
import imgLogin from "../../assets/images/profile-img.png";

const Login = () => {
  return (
    <>
      <div className="container-main">
        <div className="container-login">
          <div className="container-title">
            <div>
              <h2 className="login-title">Bienvenido de nuevo!</h2>
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
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="span-text-register">
                Regístrate ahora
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
