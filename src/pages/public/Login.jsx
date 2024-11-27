import { Link } from "react-router-dom";


import styles from './styles/Login.module.css';


/* images */
import imgLogin from "../../assets/images/profile-img.png";

const Login = () => {
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

          <form className={styles.containerForm}>
            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Email
              </div>
              <input className={styles.formInput} type="text" />
            </div>
            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Contraseña
              </div>
              <input className={styles.formInput} type="text" />
            </div>

            <button className={styles.buttonLogin}>Ingresar</button>
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
