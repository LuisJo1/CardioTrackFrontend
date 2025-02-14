import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import useRegisterDoctor from "../../hooks/useRegisterDoctor";
import styles from "./styles/Admin.module.css";
import patientImg from "../../assets/images/patient.png";
import imgPaper from "../../assets/images/papelera.svg";
import "../../App.css";
import imgLogin from "../../assets/images/profile-img.png";
import InputErrorMsg from "../../components/InputErrorMsg";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { MoonLoader } from "react-spinners";
import useGetPatientsWithFilters from "../../hooks/useGetPatientsWithFilters";

const AdminDashboard = () => {
  const patientsSearchInput = useRef(null);

  const [payload, setPayload] = useState({
    sliceIndex: 1,
    sliceSize: 10,
    searchTerm: "",
    isBeingEvaluated: false,
  });

  const { getPatientsWithFilters, data, success, deletePatient } = useGetPatientsWithFilters();

  const { getDoctorsWithFilters, dataDoctor } = useGetPatientsWithFilters();

  const { handleOnChange, handleSubmit, errors, isLoading } =
    useRegisterDoctor();

  const { logout } = useLogout();

  return (
    <>
      <div className={styles.adminHeader}>
        <div className={styles.adminHeaderTitle}>Panel de administrador</div>
        <button className="button-white button-sm" onClick={logout}>
          Cerrar sesión
        </button>
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

      <div className={styles.containerSearchPatientMain}>
        <div className={styles.searchPatientContainer}>
          <div className={styles.searchPatientHeader}>
            <h4>Búsqueda de Pacientes</h4>
            <div className={styles.searchPatientHeaderImgContainer}>
              <img src={patientImg} />
            </div>
          </div>
          <div className={styles.searchPatientFooter}>
            <div className={styles.searchPatientSearchInputContainer}>
              <input
                type="text"
                name="patientTerm"
                placeholder="Buscar por CI, Nombre..."
                ref={patientsSearchInput}
              />
              <button
                className={`button-primary button-sm ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setPayload((prev) => ({ ...prev, sliceIndex: 1 }));
                  getPatientsWithFilters({
                    ...payload,
                    sliceIndex: 1,
                    searchTerm: patientsSearchInput.current.value,
                  });
                }}
              >
                Buscar
                <MoonLoader color="#fff" loading={isLoading} size={16} />
              </button>
            </div>
            <div className={styles.searchPatientResultsContainer}>
              {!isLoading && success && data.count == 0 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500",
                    margin: "10px 0",
                  }}
                >
                  No hay resultados
                </div>
              )}
              <ul className={styles.searchPatientList}>
                {data?.results?.map((patient) => (
                  <li
                    key={patient.id}
                    className={`${styles.searchPatientListItem}`}
                  >
                    <div>
                      <div className={styles.searchPatientItemHeader}>
                        <h4>{`${patient.names} ${patient.surnames}`}</h4>
                        <div className={styles.searchPatientItemHeaderDoc}>
                          <strong>CI:</strong> {patient.ci}
                        </div>
                        <div
                          className={styles.actualTreatmentHeaderDetails}
                          style={{ fontSize: "15px" }}
                        >
                          <div>
                            <strong
                              style={{
                                marginRight: "4px",
                                fontWeight: 600,
                              }}
                            >
                              Edad:
                            </strong>
                            {patient.age} años
                          </div>
                          <div>
                            <strong className={styles.label}>
                              Fecha de nacimiento:
                            </strong>{" "}
                            {new Date(patient.bornDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={styles.searchPatientIconContainer}>
                          <span onClick={() => deletePatient(patient.id)}>
                            <img className={styles.imgPaper} src={imgPaper} alt="" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {!isLoading && success && data.results.length < data.count && (
                <div className={styles.searchLoadMoreBtnContainer}>
                  <button
                    className="button-white button-sm"
                    disabled={isLoading}
                    onClick={() => {
                      setPayload((prev) => ({
                        ...prev,
                        sliceIndex: prev.sliceIndex + 1,
                      }));
                      getPatientsWithFilters(
                        {
                          ...payload,
                          sliceIndex: payload.sliceIndex + 1,
                        },
                        true
                      );
                    }}
                  >
                    Cargar más
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.searchPatientContainer}>
          <div className={styles.searchPatientHeader}>
            <h4>Búsqueda de Doctores</h4>
            <div className={styles.searchPatientHeaderImgContainer}>
              <img src={patientImg} />
            </div>
          </div>
          <div className={styles.searchPatientFooter}>
            <div className={styles.searchPatientSearchInputContainer}>
              <input
                type="text"
                name="patientTerm"
                placeholder="Buscar por CI, Nombre..."
                ref={patientsSearchInput}
              />
              <button
                className={`button-primary button-sm ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setPayload((prev) => ({ ...prev, sliceIndex: 1 }));
                  getDoctorsWithFilters({
                    ...payload,
                    sliceIndex: 1,
                    searchTerm: patientsSearchInput.current.value,
                  });
                }}
              >
                Buscar
                <MoonLoader color="#fff" loading={isLoading} size={16} />
              </button>
            </div>
            <div className={styles.searchPatientResultsContainer}>
              {!isLoading && success && data.count == 0 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500",
                    margin: "10px 0",
                  }}
                >
                  No hay resultados
                </div>
              )}
              <ul className={styles.searchPatientList}>
                {dataDoctor?.results?.map((patient) => (
                  <li
                    key={patient.id}
                    className={`${styles.searchPatientListItem}`}
                  >
                    <div>
                      <div className={styles.searchPatientItemHeader}>
                        <h4>{`${patient.names} ${patient.surnames}`}</h4>
                        <div className={styles.searchPatientItemHeaderDoc}>
                          <strong>CI:</strong> {patient.ci}
                        </div>
                        <div
                          className={styles.actualTreatmentHeaderDetails}
                          style={{ fontSize: "15px" }}
                        >
                          <div>
                            <strong
                              style={{
                                marginRight: "4px",
                                fontWeight: 600,
                              }}
                            >
                              Edad:
                            </strong>
                            {patient.age} años
                          </div>
                          <div>
                            <strong className={styles.label}>
                              Fecha de nacimiento:
                            </strong>{" "}
                            {new Date(patient.bornDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={styles.searchPatientIconContainer}>
                          <i className="bi bi-plus-square-fill"></i>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {!isLoading && success && data.results.length < data.count && (
                <div className={styles.searchLoadMoreBtnContainer}>
                  <button
                    className="button-white button-sm"
                    disabled={isLoading}
                    onClick={() => {
                      setPayload((prev) => ({
                        ...prev,
                        sliceIndex: prev.sliceIndex + 1,
                      }));
                      getDoctorsWithFilters(
                        {
                          ...payload,
                          sliceIndex: payload.sliceIndex + 1,
                        },
                        true
                      );
                    }}
                  >
                    Cargar más
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
