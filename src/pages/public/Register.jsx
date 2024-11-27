import { Link } from "react-router-dom";

import styles from "./styles/Register.module.css";

import imgLogin from "../../assets/images/profile-img.png";

const Register = () => {
  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.containerLogin}>
          <div className={styles.containerTitle}>
            <div>
              <h2 className={styles.loginTitle}>Registro</h2>
              <h3 className={styles.loginSubtitle}>Cardio Track</h3>
            </div>
            <img className={styles.imgProfile} src={imgLogin} alt="" />
          </div>

          <form className={styles.containerForm}>
            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Nombre
              </div>
              <input className={styles.formInput} type="text" />
            </div>

            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Edad
              </div>
              <input className={styles.formInput} type="number" />
            </div>

            <div className={styles.containerFormCard}>
              <div className={styles.formLabel} htmlFor="">
                Sexo
              </div>
              <select className={styles.formInput}>
                <option defaultValue="0">Seleccione</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
              </select>
            </div>

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
              ¿Tienes una cuenta?{" "}
              <Link to="/login" className={styles.spanTextRegister}>
                Iniciar sesión
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
