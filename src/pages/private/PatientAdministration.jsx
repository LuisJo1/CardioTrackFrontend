// import { useState } from "react";

import medicineImg from "../../assets/images/medicine.png";
import medicBackgroundRedImg from "../../assets/images/medic-background-red.png";
import medicBackgroundImg from "../../assets/images/medic-background.png";
import styles from "./styles/PatientAdministration.module.css";
import "../../App.css";
import imgPerfil from "../../assets/images/perfil-1.jpg";
import { useContext, useEffect, useState } from "react";
import AddTreatmentForm from "./AddTreatmentForm";
import AddExamForm from "./AddExamForm";
import useLogout from "../../hooks/useLogout";
import ExamItemList from "../../components/ExamItemList";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../routes/AuthContext";
import useGetPatientById from "../../hooks/useGetPatientById";
import useGetTreatmentsWithFilters from "../../hooks/useGetTreatmentsWithFilters";
import useIsOnMobile from "../../hooks/useIsOnMobile";
import useGetActualTreatment from "../../hooks/useGetActualTreatment";
import usePrint from "../../hooks/usePrint";
import useGetExamsWithFilters from "../../hooks/useGetExamsWithFilters";

const PatientAdministration = () => {
  const [print] = usePrint();
  const getPatientByIdHook = useGetPatientById();
  const getPatientTreatmentsHook = useGetTreatmentsWithFilters();
  const actualTreatmentHook = useGetActualTreatment();
  const [patient, setPatient] = useState(null);
  const { isOnMobile } = useIsOnMobile();
  const [currentSection, setCurrentSection] = useState(0);
  const params = useParams();
  const context = useContext(AuthContext);
  const user = context.user;
  const examsHook = useGetExamsWithFilters();
  const [examsPayload, setExamsPayload] = useState({
    getAll: true,
    patientId: !isNaN(Number(params.id)) ? Number(params.id) : 0
  });
  const [actualTreatmentPayload, setActualTreatmentPayload] = useState({
    getLatest: true,
    patientId: !isNaN(Number(params.id)) ? Number(params.id) : 0
  });
  const [patientTreatmentsPayload, setPatientTreatmentsPayload] = useState({
    sliceIndex: 1,
    sliceSize: 10,
    examId: 0,
    patientId: !isNaN(Number(params.id)) ? Number(params.id) : 0,
    getLatest: false,
    treatmentId: 0,
    getAll: true
  });
  const navigate = useNavigate();
  const { logout } = useLogout();
  useEffect(() => {
    actualTreatmentHook.getActualTreatment(actualTreatmentPayload);
    examsHook.getExamsWithFilters(examsPayload);
  }, []);
  useEffect(() => {
    if (params.id) {
      getPatientByIdHook.getPatientById(Number(params.id));
    }
  }, [params]);
  useEffect(() => {
    if (!getPatientByIdHook.isLoading && getPatientByIdHook.success) {
      setPatient(getPatientByIdHook.data);
    } else {
      setPatient(null);
    }
  }, [getPatientByIdHook.isLoading]);
  useEffect(() => {
    if (patientTreatmentsPayload.sliceIndex > 1) {
      getPatientTreatmentsHook.getTreatmentsWithFilters(
        patientTreatmentsPayload,
        true
      );
    } else {
      getPatientTreatmentsHook.getTreatmentsWithFilters(
        patientTreatmentsPayload,
        false
      );
    }
  }, [patientTreatmentsPayload]);
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
              {`${user?.doctor.names} ${user?.doctor.surnames}`}
            </h2>
            <h3>
              <strong className={styles.labelPersonalData}>
                Especialidad:
              </strong>{" "}
              {user?.doctor.specialty}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>C.I:</strong>{" "}
              {user?.doctor.ci}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Teléfono:</strong>{" "}
              {user?.doctor.phoneNumber}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Email:</strong>{" "}
              {user?.email}
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
            <div className={styles.helloMainPanelTop}>
              {isOnMobile && (
                <button
                  className="button-white btn button-sm"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <i className="bi bi-caret-left-fill"></i>
                </button>
              )}
              Datos del paciente{" "}
              {`${patient?.names ?? ""} ${patient?.surnames ?? ""}`}
            </div>
            <div className={styles.helloMainPanelButtonsContainer}>
              {!isOnMobile && (
                <button
                  className="button-white btn"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <i className="bi bi-caret-left-fill"></i>
                  Volver al panel
                </button>
              )}
              <button
                className="button-green btn"
                onClick={() => {
                  setCurrentSection(1);
                }}
              >
                Añadir nuevo Tratamiento
                <i className="bi bi-capsule"></i>
              </button>
              <button
                className="button-primary btn"
                onClick={() => {
                  setCurrentSection(2);
                }}
              >
                Añadir nuevo Examen
                <i className="bi bi-file-earmark-plus"></i>
              </button>
            </div>
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
              <h5>{`${user?.doctor.names} ${user?.doctor.surnames}`}</h5>
              <h6>{user?.email}</h6>
              <div>
                <strong>CI:</strong>
                {user?.doctor.ci}
              </div>
              <div>
                <strong>Especialidad:</strong>
                {user?.doctor.specialty}
              </div>
            </div>
          </div>
          {currentSection === 0 && (
            <>
              <div className={styles.row}>
                <div className={styles.actualTreatment}>
                  <div className={styles.actualTreatmentTop}>
                    <h4>Tratamiento actual</h4>
                    <div className={styles.actualTreatmentTopImgContainer}>
                      <img src={medicineImg} />
                    </div>
                  </div>
                  <div style={{ padding: "8px" }}>
                    <div className={styles.actualTreatmentHeader}>
                      {actualTreatmentHook.data ? (
                        <>
                          <h4>Tratamiento #{actualTreatmentHook.data?.id}</h4>
                          <div className={styles.actualTreatmentHeaderDetails}>
                            <div>
                              <strong
                                style={{ marginRight: "4px", fontWeight: 600 }}
                              >
                                Duración:
                              </strong>
                              {`${actualTreatmentHook.data?.duration} ${
                                actualTreatmentPayload.data
                                  ?.durationParameter === "week"
                                  ? "semanas"
                                  : "días"
                              }`}
                            </div>
                            <div>
                              <strong className={styles.label}>Desde el</strong>{" "}
                              {new Date(
                                actualTreatmentHook.data?.treatmentStartDate ??
                                  ""
                              ).toLocaleDateString()}
                            </div>
                            <div>
                              <strong className={styles.label}>Hasta el</strong>{" "}
                              {new Date(
                                actualTreatmentHook.data?.treatmentEndDate ?? ""
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4>Sin tratamiento actual</h4>
                        </>
                      )}
                    </div>
                    <div className={styles.actualTreatmentDescription}>
                      <h4
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                          opacity: ".7"
                        }}
                      >
                        Descripción
                      </h4>
                      <div>{actualTreatmentHook.data?.description}</div>
                    </div>
                    <div className={styles.actualTreatmentMedicinesContainer}>
                      {actualTreatmentHook.data ? (
                        <>
                          <h4>Medicamentos</h4>
                          <table
                            className={styles.actualTreatmentMedicinesTable}
                          >
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Tomar cada</th>
                                <th>Durante</th>
                              </tr>
                            </thead>
                            <tbody>
                              {actualTreatmentHook.data?.treatmentMedicines?.map(
                                (tm) => (
                                  <tr key={tm.medicineName}>
                                    <td>{tm.medicineName}</td>
                                    <td>
                                      {tm.takeEvery}{" "}
                                      {tm.takeEvery > 1 ? "horas" : "hora"}
                                    </td>
                                    <td>
                                      {tm.duration}{" "}
                                      {tm.durationParameter === "week"
                                        ? "semanas"
                                        : "días"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.containerMedicBackground}>
                  <div className={styles.medicBackgroundHeader}>
                    <h4>Historial médico</h4>
                    <div className={styles.medicBackgroundHeaderImgContainer}>
                      <img src={medicBackgroundImg} />
                    </div>
                  </div>
                  <div className={styles.searchPatientFooter}>
                    <div
                      className={styles.searchPatientSearchInputContainer}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        className={`button-green button-sm ${
                          getPatientTreatmentsHook.isLoading ? "loading" : ""
                        }`}
                        disabled={getPatientTreatmentsHook.isLoading}
                        style={{ fontSize: "18px" }}
                        onClick={() => {
                          print("medicBackground");
                        }}
                      >
                        Imprimir
                        <i className="bi bi-filetype-pdf"></i>
                      </button>
                    </div>
                    <div
                      className={styles.searchPatientResultsContainer}
                      id="medicBackground"
                    >
                      <ul className={styles.listMedicBackground}>
                        {!getPatientTreatmentsHook.isLoading &&
                          getPatientTreatmentsHook.success &&
                          getPatientTreatmentsHook.data.count == 0 && (
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
                        {getPatientTreatmentsHook.data?.results?.map((pt) => (
                          <li
                            key={pt?.id}
                            className={styles.medicBackGroundListItem}
                          >
                            <div>
                              <div className={styles.medicBackgroundItemHeader}>
                                <h4 style={{ color: "#010258be" }}>
                                  Tratamiento #{pt?.id}
                                </h4>
                                <div
                                  className={`${styles.medicBackgroundItemHeaderDoc} ItemHeaderTwo`}
                                >
                                  <strong>Doctor(a):</strong> {pt?.doctorName}
                                </div>
                                <div
                                  className={`${styles.actualTreatmentHeaderDetails} headerDetails`}
                                  style={{ fontSize: "15px" }}
                                >
                                  <div>
                                    <strong
                                      style={{
                                        marginRight: "4px",
                                        fontWeight: 600
                                      }}
                                    >
                                      Duración:
                                    </strong>
                                    {`${pt?.duration} ${
                                      pt?.durationParameter === "week"
                                        ? "semanas"
                                        : "días"
                                    }`}
                                  </div>
                                  <div>
                                    <strong className={styles.label}>
                                      Desde el
                                    </strong>{" "}
                                    {new Date(
                                      pt?.treatmentStartDate
                                    ).toLocaleDateString()}
                                  </div>
                                  <div>
                                    <strong className={styles.label}>
                                      Hasta el
                                    </strong>{" "}
                                    {new Date(
                                      pt?.treatmentEndDate
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className={styles.medicBackgroundItemFooter}>
                                <h4 className="ItemHeaderThree">
                                  Medicamentos
                                </h4>
                                <div
                                  className={
                                    styles.medicBackgroundItemFooterList
                                  }
                                >
                                  <table
                                    className={
                                      styles.actualTreatmentMedicinesTable
                                    }
                                  >
                                    <thead>
                                      <tr>
                                        <th>Nombre</th>
                                        <th>Tomar cada</th>
                                        <th>Durante</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pt.treatmentMedicines?.map((tm) => (
                                        <tr key={tm.medicineName}>
                                          <td>{tm.medicineName}</td>
                                          <td>
                                            {tm.takeEvery}{" "}
                                            {tm.takeEvery > 1
                                              ? "horas"
                                              : "hora"}
                                          </td>
                                          <td>
                                            {tm.duration}{" "}
                                            {tm.durationParameter === "week"
                                              ? "semanas"
                                              : "días"}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {!getPatientTreatmentsHook.isLoading &&
                        getPatientTreatmentsHook.success &&
                        getPatientTreatmentsHook.data.results.length <
                          getPatientTreatmentsHook.data.count && (
                          <div className={styles.searchLoadMoreBtnContainer}>
                            <button
                              className="button-white button-sm"
                              disabled={getPatientTreatmentsHook.isLoading}
                              onClick={() => {
                                setPatientTreatmentsPayload((prev) => ({
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
              </div>
              <div className={styles.row} style={{ with: "100%" }}>
                <div
                  className={styles.containerMedicBackground}
                  style={{ width: "100%" }}
                >
                  <div
                    className={styles.medicBackgroundHeader}
                    style={{ backgroundColor: "#ff88aa40" }}
                  >
                    <h4 style={{ color: "#FE2121" }}>Exámenes medicos</h4>
                    <div className={styles.medicBackgroundHeaderImgContainer}>
                      <img src={medicBackgroundRedImg} />
                    </div>
                  </div>
                  <div className={styles.searchPatientFooter}>
                    <div
                      className={styles.searchPatientSearchInputContainer}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        className={`button-green button-sm ${
                          getPatientTreatmentsHook.isLoading ? "loading" : ""
                        }`}
                        disabled={getPatientTreatmentsHook.isLoading}
                        style={{ fontSize: "18px" }}
                        onClick={() => {
                          print("examBackground");
                        }}
                      >
                        Imprimir
                        <i className="bi bi-filetype-pdf"></i>
                      </button>
                    </div>
                    <div
                      className={styles.searchPatientResultsContainer}
                      id="examBackground"
                    >
                      <ul
                        className={styles.listMedicBackground}
                        style={{ maxHeight: "90vh" }}
                      >
                        {!examsHook.isLoading &&
                          examsHook.success &&
                          examsHook.data.count == 0 && (
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
                        {examsHook.data?.results?.map((e) => (
                          <ExamItemList
                            exam={e}
                            patient={user.patient}
                            key={e.id}
                          />
                        ))}
                      </ul>
                      {!examsHook.isLoading &&
                        examsHook.success &&
                        examsHook.data.results.length <
                          examsHook.data.count && (
                          <div className={styles.searchLoadMoreBtnContainer}>
                            <button
                              className="button-white button-sm"
                              disabled={examsHook.isLoading}
                              onClick={() => {
                                setPatientTreatmentsPayload((prev) => ({
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
              </div>
            </>
          )}
          {currentSection === 1 && (
            <div className={styles.row}>
              <AddTreatmentForm patient={patient} doctor={user} />
            </div>
          )}
          {currentSection === 2 && (
            <div className={styles.row}>
              <AddExamForm patient={patient} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientAdministration;
