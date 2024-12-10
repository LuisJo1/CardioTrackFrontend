/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles/ProfileDoctor.module.css";
import patientImg from "../../assets/images/patient.png";
import patientListImg from "../../assets/images/patient-list.png";
import imgPerfil from "../../assets/images/perfil-1.jpg";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useLogout from "../../hooks/useLogout";
import { AuthContext } from "../../routes/AuthContext";
import useGetPatientsWithFilters from "../../hooks/useGetPatientsWithFilters";
import { MoonLoader } from "react-spinners";
import useGetDoctorPatientsWithFilters from "../../hooks/useGetDoctorPatientsWithFilters";
import useAddDoctorPatient from "../../hooks/useAddDoctorPatient";
import { useNavigate } from "react-router-dom";

const ProfileDoctor = () => {
  const context = useContext(AuthContext);
  const user = context.user;
  const [doctorPatientsPayload, setDoctorPatientsPayload] = useState({
    sliceIndex: 1,
    sliceSize: 30,
    searchTerm: ""
  });
  const doctorPatientsHook = useGetDoctorPatientsWithFilters();
  const addDoctorPatientHook = useAddDoctorPatient();
  const [payload, setPayload] = useState({
    sliceIndex: 1,
    sliceSize: 10,
    searchTerm: "",
    isBeingEvaluated: false
  });
  const { getPatientsWithFilters, isLoading, data, success } =
    useGetPatientsWithFilters();
  const { logout } = useLogout();
  const patientsSearchInput = useRef(null);
  const doctorPatientsSearchInput = useRef(null);
  const [callByScroll, setCallByScroll] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAddPatientModalOpen) {
      Swal.fire({
        title: "¿Estás seguro de añadir este paciente?",
        html: `
        <div>
        <div>Añadirás al paciente: ${selectedPatient.names} ${selectedPatient.surnames}</div>
        <div><strong style="font-weight: 600;">CI:</strong>${selectedPatient.ci}</div>
        </div>
        `,
        confirmButtonText: "Sí, añadir paciente",
        cancelButtonText: "No, cancelar",
        showCancelButton: true
      }).then((resp) => {
        if (resp.isConfirmed) {
          addDoctorPatientHook.addDoctorPatient(selectedPatient.id);
        } else {
          setSelectedPatient(null);
          setIsAddPatientModalOpen(false);
        }
      });
    }
  }, [isAddPatientModalOpen]);
  useEffect(() => {
    if (doctorPatientsPayload.sliceIndex > 1) {
      doctorPatientsHook.getDoctorPatientsWithFilters(
        doctorPatientsPayload,
        true
      );
    } else {
      doctorPatientsHook.getDoctorPatientsWithFilters(
        doctorPatientsPayload,
        false
      );
    }
  }, [doctorPatientsPayload]);
  useEffect(() => {
    if (!addDoctorPatientHook.isLoading && addDoctorPatientHook.success) {
      Swal.fire({
        title: "Se ha añadido al paciente a tu lista de pacientes",
        icon: "success",
        confirmButtonText: "Ok"
      }).then((resp) => {
        if (resp.isConfirmed) {
          doctorPatientsHook.getDoctorPatientsWithFilters(
            doctorPatientsPayload,
            false
          );
          setIsAddPatientModalOpen(false);
          getPatientsWithFilters(payload, false);
        } else {
          setSelectedPatient(null);
          setIsAddPatientModalOpen(false);
        }
      });
    }
  }, [addDoctorPatientHook.isLoading, addDoctorPatientHook.success]);
  return (
    <>
      <div className={styles.containerProfile}>
        <div
          className={`${styles.containerCardDatePerson} ${styles.showOnDesktop}`}
        >
          <div>
            <img src={imgPerfil} className={styles.imgProfile} />
          </div>
          <div className={styles.containerPersonalData}>
            <h1 className={styles.titlePersonalData}>Datos Personales</h1>
            <h2 className={styles.namePersonalData}>
              {`${user.doctor.names} ${user.doctor.surnames}`}
            </h2>
            <h3>
              <strong className={styles.labelPersonalData}>
                Especialidad:
              </strong>{" "}
              {user.doctor.specialty}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>C.I:</strong>{" "}
              {user.doctor.ci}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Teléfono:</strong>{" "}
              {user.doctor.phoneNumber}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Email:</strong>{" "}
              {user.email}
            </h3>
          </div>
          <div className={styles.footerPersonalData}>
            <button
              className={"button-white"}
              onClick={() => {
                logout();
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.helloMainPanel}>
            Bienvenid{user.doctor.genre === "F" ? "a" : "o"}
            {", "}
            {`${user.doctor.names} ${user.doctor.surnames}`}
          </div>
          <div className={styles.mobilePersonalDataContainer}>
            <div className={styles.mobilePersonalDataImgContainer}>
              <img src={imgPerfil} />
            </div>
            <div className={styles.mobilePersonalDataHeader}>
              <h4>Datos personales</h4>
              <button
                className={styles.mobilePersonalDataLogoutBtn}
                onClick={() => {
                  logout();
                }}
              >
                Cerrar sesión
              </button>
            </div>
            <div className={styles.mobilePersonalDataDetails}>
              <h5>{`${user.doctor.names} ${user.doctor.surnames}`}</h5>
              <h6>{user.email}</h6>
              <div>
                <strong>CI:</strong>
                {user.doctor.ci}
              </div>
              <div>
                <strong>Especialidad:</strong>
                {user.doctor.specialty}
              </div>
              <div>
                <strong>Teléfono:</strong>
                {user.doctor.phoneNumber}
              </div>
              {/* <div>
                <strong>Edad:</strong>28
              </div> */}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.currentPatientsContainer}>
              <div
                className={styles.searchPatientHeader}
                style={{ backgroundColor: "#d4dbf9" }}
              >
                <h4 style={{ color: "#556ee6" }}>Pacientes en Seguimiento</h4>
                <div className={styles.searchPatientHeaderImgContainer}>
                  <img src={patientListImg} />
                </div>
              </div>
              <div className={styles.searchPatientFooter}>
                <div className={styles.searchPatientSearchInputContainer}>
                  <input
                    type="text"
                    name="patientTerm"
                    ref={doctorPatientsSearchInput}
                    placeholder="Buscar por CI, Nombre..."
                  />
                  <button
                    className={`button-primary button-sm ${
                      doctorPatientsHook.isLoading ? "loading" : ""
                    }`}
                    disabled={doctorPatientsHook.isLoading}
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      setDoctorPatientsPayload((prev) => ({
                        ...prev,
                        sliceIndex: 1,
                        searchTerm: doctorPatientsSearchInput.current.value
                      }));
                    }}
                  >
                    Buscar
                    <MoonLoader
                      color="#fff"
                      loading={doctorPatientsHook.isLoading}
                      size={16}
                    />
                  </button>
                </div>
                <div className={styles.searchPatientResultsContainer}>
                  {!doctorPatientsHook.isLoading &&
                    doctorPatientsHook.success &&
                    doctorPatientsHook.data?.count == 0 && (
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "500",
                          margin: "10px 0"
                        }}
                      >
                        No hay resultados
                      </div>
                    )}
                  <ul className={styles.searchPatientList}>
                    {doctorPatientsHook.data?.results?.map((patient) => (
                      <li
                        key={patient.patient.id}
                        className={styles.searchPatientListItem}
                        onClick={() => {
                          navigate(`/patient/${patient.patient.id}`);
                        }}
                      >
                        <div>
                          <div className={styles.searchPatientItemHeader}>
                            <h4>{`${patient.patient.names} ${patient.patient.surnames}`}</h4>
                            <div className={styles.searchPatientItemHeaderDoc}>
                              <strong>CI:</strong> 123456789
                            </div>
                            <div
                              className={styles.actualTreatmentHeaderDetails}
                              style={{ fontSize: "15px" }}
                            >
                              <div>
                                <strong
                                  style={{
                                    marginRight: "4px",
                                    fontWeight: 600
                                  }}
                                >
                                  Edad:
                                </strong>
                                {patient.patient.age} años
                              </div>
                              <div>
                                <strong className={styles.label}>
                                  Fecha de nacimiento:
                                </strong>{" "}
                                {new Date(
                                  patient.patient.bornDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className={styles.searchPatientIconContainer}>
                              <i className="bi bi-arrow-right-square-fill"></i>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!doctorPatientsHook.isLoading &&
                    success &&
                    doctorPatientsHook.data?.results.length <
                      doctorPatientsHook.data?.count && (
                      <div className={styles.searchLoadMoreBtnContainer}>
                        <button
                          className="button-white button-sm"
                          disabled={isLoading}
                          onClick={() => {
                            setDoctorPatientsPayload((prev) => ({
                              ...prev,
                              sliceIndex: prev.sliceIndex + 1
                            }));
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
                        searchTerm: patientsSearchInput.current.value
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
                        margin: "10px 0"
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
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsAddPatientModalOpen(true);
                        }}
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
                                    fontWeight: 600
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
                                {new Date(
                                  patient.bornDate
                                ).toLocaleDateString()}
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
                  {!isLoading &&
                    success &&
                    data.results.length < data.count && (
                      <div className={styles.searchLoadMoreBtnContainer}>
                        <button
                          className="button-white button-sm"
                          disabled={isLoading}
                          onClick={() => {
                            setPayload((prev) => ({
                              ...prev,
                              sliceIndex: prev.sliceIndex + 1
                            }));
                            getPatientsWithFilters(
                              {
                                ...payload,
                                sliceIndex: payload.sliceIndex + 1
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
        </div>
      </div>
    </>
  );
};
export default ProfileDoctor;
