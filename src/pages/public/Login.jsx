import { Link } from "react-router-dom";

import styles from "./styles/Login.module.css";

/* images */
import imgLogin from "../../assets/images/profile-img.png";
import useLoginForm from "../../hooks/useLoginForm";
import InputErrorMsg from "../../components/InputErrorMsg";

const Login = () => {
  const { handleOnChange, errors, handleSubmit } = useLoginForm();
  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.containerLogin}>
          <div className={styles.containerTitle}>
            <div>
              <h2 className={styles.loginTitle}>Bienvenido de nuevo!</h2>
              <h3 className={styles.loginSubtitle}>Cardio Track</h3>
            </div>
            <img className={styles.imgProfile} src={imgLogin} alt="" />
          </div>

          <form className={styles.containerForm} onSubmit={handleSubmit}>
            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Email
              </div>
              <input
                name="email"
                className={styles.formInput}
                onChange={handleOnChange}
                type="text"
              />
              <InputErrorMsg
                show={errors.emailError.length > 0}
                message={errors.emailError}
              />
            </div>
            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Contraseña
              </div>
              <input
                className={styles.formInput}
                name="password"
                onChange={handleOnChange}
                type="password"
              />
              <InputErrorMsg
                show={errors.passwordError.length > 0}
                message={errors.passwordError}
              />
              <InputErrorMsg
                show={errors.serviceError.length > 0}
                message={errors.serviceError}
              />
            </div>

            <button
              className={styles.buttonLogin}
              disabled={Object.values(errors).some((value) => value.length > 0)}
            >
              Ingresar
            </button>
          </form>

          <div className={styles.containerTextRegister}>
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className={styles.spanTextRegister}>
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
