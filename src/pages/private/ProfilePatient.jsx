// import { useState } from "react";

import medicineImg from "../../assets/images/medicine.png";
import medicExamImg from "../../assets/images/medic-exam.png";
import doctorImg from "../../assets/images/doctor.png";
import medicBackgroundImg from "../../assets/images/medic-background.png";
import styles from "./styles/ProfilePatient.module.css";
import "../../App.css";
import imgPerfil from "../../assets/images/perfil-1.jpg";
import useLogout from "../../hooks/useLogout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../routes/AuthContext";
import useGetTreatmentsWithFilters from "../../hooks/useGetTreatmentsWithFilters";
import useGetActualTreatment from "../../hooks/useGetActualTreatment";
import useGetDoctorAttending from "../../hooks/useGetDoctorAttending";
import usePrint from "../../hooks/usePrint";
import useGetExamsWithFilters from "../../hooks/useGetExamsWithFilters";

const ProfilePatient = () => {
  const { logout } = useLogout();
  const [print] = usePrint();
  const context = useContext(AuthContext);
  const user = context.user;
  const doctorAttendingHook = useGetDoctorAttending();
  const actualTreatmentHook = useGetActualTreatment();
  const [actualTreatmentPayload, setActualTreatmentPayload] = useState({
    getLatest: true,
    patientId: user?.patient?.id
  });
  const examsHook = useGetExamsWithFilters();
  const getPatientTreatmentsHook = useGetTreatmentsWithFilters();
  const [patientTreatmentsPayload, setPatientTreatmentsPayload] = useState({
    sliceIndex: 1,
    sliceSize: 10,
    patientId: user?.patient?.id,
    treatmentId: 0,
    getAll: true
  });
  useEffect(() => {
    doctorAttendingHook.getDoctorAttending({
      patientId: user?.patient?.id
    });
    actualTreatmentHook.getActualTreatment(actualTreatmentPayload);
  }, []);
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
            <h2
              className={styles.namePersonalData}
            >{`${user.patient.names} ${user.patient.surnames}`}</h2>
            <h3>
              <strong className={styles.labelPersonalData}>C.I:</strong>{" "}
              {user.patient.ci}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Género:</strong>{" "}
              {user.patient.genre === "F" ? "Femenino" : "Masculino"}
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Edad:</strong>{" "}
              {user.patient.age}
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
            Bienvenid{user.patient.genre === "F" ? "a" : "o"},{" "}
            {`${user.patient.names} ${user.patient.surnames}`}
          </div>
          <div className={styles.mobilePersonalDataContainer}>
            <div className={styles.mobilePersonalDataImgContainer}>
              <img src={imgPerfil} />
            </div>
            <div className={styles.mobilePersonalDataHeader}>
              <h4>Mis datos personales</h4>
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
              <h5>{`${user.patient.names} ${user.patient.surnames}`}</h5>
              <h6>CI: {user.patient.ci}</h6>
              <div></div>
              <div>
                <strong>Género:</strong>
                {user.patient.genre === "F" ? "Femenino" : "Masculino"}
              </div>
              <div>
                <strong>Edad:</strong>
                {user.patient.age}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.row} ${styles.left}`}>
              {" "}
              <div className={styles.doctorAttendingContainer}>
                <div className={styles.doctorAttendingHeader}>
                  {doctorAttendingHook.data ? (
                    <h4>
                      Estás siendo atentido por
                      <br /> el Dr(a) {doctorAttendingHook.data?.doctorName}
                    </h4>
                  ) : (
                    <>
                      <h4>No estás siendo atendido aún</h4>
                    </>
                  )}
                  <div className={styles.doctorAttendingHeaderImgContainer}>
                    <img src={doctorImg} />
                  </div>
                </div>
                <div className={styles.doctorAttendingFooter}>
                  {doctorAttendingHook.data && (
                    <h4>{doctorAttendingHook.data?.doctorSpecialty}</h4>
                  )}
                  <div className={styles.doctorAttendingFooterDetails}>
                    <div className={styles.doctorAttendingFooterDetailsExams}>
                      <div
                        className={
                          styles.doctorAttendingFooterDetailsExamsImgContainer
                        }
                      >
                        <img src={medicExamImg} />
                      </div>
                      {doctorAttendingHook.data && (
                        <p>
                          {doctorAttendingHook.data?.examsCount} Examenes
                          realizados desde el{" "}
                          {new Date(
                            doctorAttendingHook.data?.issueDate ?? ""
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
                              actualTreatmentPayload.data?.durationParameter ===
                              "week"
                                ? "semanas"
                                : "días"
                            }`}
                          </div>
                          <div>
                            <strong className={styles.label}>Desde el</strong>{" "}
                            {new Date(
                              actualTreatmentHook.data?.treatmentStartDate ?? ""
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
                        <table className={styles.actualTreatmentMedicinesTable}>
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
                            <h4 className="ItemHeaderThree">Medicamentos</h4>
                            <div
                              className={styles.medicBackgroundItemFooterList}
                            >
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
                                  {pt.treatmentMedicines?.map((tm) => (
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
          {/*  <div className={styles.row}>
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
                            <h4 className="ItemHeaderThree">Medicamentos</h4>
                            <div
                              className={styles.medicBackgroundItemFooterList}
                            >
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
                                  {pt.treatmentMedicines?.map((tm) => (
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
           */}
        </div>
      </div>
    </>
  );
};

export default ProfilePatient;
