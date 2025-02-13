import useRegisterDoctor from "../../hooks/useRegisterDoctor";
import styles from "./styles/Admin.module.css";
import "../../App.css";
import imgLogin from "../../assets/images/profile-img.png";
import InputErrorMsg from "../../components/InputErrorMsg";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
const AdminDashboard = () => {
    const { handleOnChange, handleSubmit, errors, isLoading } = useRegisterDoctor();
    const {logout} = useLogout();
    return <>
    <div className={styles.adminHeader}>
        <div className={styles.adminHeaderTitle}>Panel de administrador</div>
        <button className="button-white button-sm" onClick={logout}>Cerrar sesión</button>
    </div>
        <div className={styles.containerMain}>
            <div className={styles.containerLogin}>
                <div className={styles.containerTitle}>
                    <div>
                        <h2 className={styles.loginTitle}>Registro Doctor</h2>
                        <h3 className={styles.loginSubtitle}>Cardio Track</h3>
                    </div>
                    <img className={styles.imgProfile} src={imgLogin} alt="" />
                </div>

                <form
                    className={styles.containerForm}
                    onSubmit={(ev) => {
                        handleSubmit(ev);
                    }}
                >
                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Nombres
                        </div>
                        <input
                            className={styles.formInput}
                            onChange={handleOnChange}
                            name="names"
                            type="text"
                        />
                        <InputErrorMsg
                            show={errors.names.length > 0}
                            message={errors.names}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Apellidos
                        </div>
                        <input
                            className={styles.formInput}
                            name="surnames"
                            type="text"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg
                            show={errors.surnames.length > 0}
                            message={errors.surnames}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Cédula de Identidad
                        </div>
                        <input
                            className={styles.formInput}
                            name="ci"
                            type="text"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg show={errors.ci.length > 0} message={errors.ci} />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Sexo
                        </div>
                        <select
                            className={styles.formInput}
                            name="genre"
                            onChange={handleOnChange}
                        >
                            <option>Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        <InputErrorMsg
                            show={errors.genre.length > 0}
                            message={errors.genre}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Fecha de nacimiento
                        </div>
                        <input
                            className={styles.formInput}
                            type="date"
                            name="bornDate"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg
                            show={errors.bornDate.length > 0}
                            message={errors.bornDate}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Email
                        </div>
                        <input
                            className={styles.formInput}
                            name="email"
                            type="text"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg
                            show={errors.email.length > 0}
                            message={errors.email}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Número de teléfono
                        </div>
                        <input
                            className={styles.formInput}
                            name="phoneNumber"
                            type="tel"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg
                            show={errors.phoneNumber.length > 0}
                            message={errors.phoneNumber}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Contraseña
                        </div>
                        <input
                            className={styles.formInput}
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                        />
                        <InputErrorMsg
                            show={errors.password.length > 0}
                            message={errors.password}
                        />
                    </div>

                    <div className={styles.containerFormCard}>
                        <div className={styles.formLabel} htmlFor="">
                            Confirmar contraseña
                        </div>
                        <input
                            className={styles.formInput}
                            type="password"
                            name="confirmPassword"
                            onChange={handleOnChange}
                        />
                    </div>

                    <button
                        className={styles.buttonLogin}
                        disabled={
                            Object.values(errors).some((el) => el.length > 0) || isLoading
                        }
                    >
                        Registrar doctor
                    </button>
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
}
export default AdminDashboard;