// import { useState } from "react";

import medicineImg from "../../assets/images/medicine.png";
// import medicExamImg from "../../assets/images/medic-exam.png";
// import doctorImg from "../../assets/images/doctor.png";
import medicBackgroundImg from "../../assets/images/medic-background.png";
import styles from "./styles/PatientAdministration.module.css";
import "../../App.css";
import imgPerfil from "../../assets/images/perfil-1.jpg";
import { useState } from "react";
import AddTreatmentForm from "./AddTreatmentForm";
import AddExamForm from "./AddExamForm";

const PatientAdministration = () => {
  const [currentSection, setCurrentSection] = useState(0);

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
              Theophrastus Aeroulus Von
            </h2>
            <h3>
              <strong className={styles.labelPersonalData}>
                Especialidad:
              </strong>{" "}
              Cardiólogo
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>C.I:</strong>{" "}
              22455676
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Teléfono:</strong>{" "}
              123456789
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Email:</strong>{" "}
              Cardiologo@gmail.com
            </h3>
          </div>
          <div className={styles.footerPersonalData}>
            <button className={"button-white"}>Cerrar sesión</button>
          </div>
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.helloMainPanel}>
            <div>Datos del paciente Oscar Gonzales</div>
            <div className={styles.helloMainPanelButtonsContainer}>
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
              <h4>Mis datos personales</h4>
              <button className={styles.mobilePersonalDataLogoutBtn}>
                Cerrar sesión
              </button>
            </div>
            <div className={styles.mobilePersonalDataDetails}>
              <h5>Oscar Gonzales</h5>
              <h6>oscargonazles@gmail.com</h6>
              <div>
                <strong>CI:</strong>
                123456789
              </div>
              <div>
                <strong>Genero:</strong>M
              </div>
              <div>
                <strong>Edad:</strong>28
              </div>
            </div>
          </div>
          {currentSection === 0 && (
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
                    <h4>Tratamiento #1</h4>
                    <div className={styles.actualTreatmentHeaderDetails}>
                      <div>
                        <strong style={{ marginRight: "4px", fontWeight: 600 }}>
                          Duración:
                        </strong>
                        6 semanas
                      </div>
                      <div>
                        <strong className={styles.label}>Desde el</strong>{" "}
                        11/12/2024
                      </div>
                      <div>
                        <strong className={styles.label}>Hasta el</strong>{" "}
                        11/12/2024
                      </div>
                    </div>
                  </div>
                  <div className={styles.actualTreatmentMedicinesContainer}>
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
                        <tr>
                          <td>Acetaminofen</td>
                          <td>8 horas</td>
                          <td>7 días</td>
                        </tr>
                        <tr>
                          <td>Quetoprofeno</td>
                          <td>12 horas</td>
                          <td>14 días</td>
                        </tr>
                        <tr>
                          <td>Quetoprofeno</td>
                          <td>12 horas</td>
                          <td>14 días</td>
                        </tr>
                        <tr>
                          <td>Quetoprofeno</td>
                          <td>12 horas</td>
                          <td>14 días</td>
                        </tr>
                        <tr>
                          <td>Quetoprofeno</td>
                          <td>12 horas</td>
                          <td>14 días</td>
                        </tr>
                      </tbody>
                    </table>
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
                <ul className={styles.listMedicBackground}>
                  <li className={styles.medicBackGroundListItem}>
                    <div>
                      <div className={styles.medicBackgroundItemHeader}>
                        <h4>Tratamiento #2</h4>
                        <div className={styles.medicBackgroundItemHeaderDoc}>
                          <strong>Doctor(a):</strong> Theoprhastus Von Hohenheim
                        </div>
                        <div
                          className={styles.actualTreatmentHeaderDetails}
                          style={{ fontSize: "15px" }}
                        >
                          <div>
                            <strong
                              style={{ marginRight: "4px", fontWeight: 600 }}
                            >
                              Duración:
                            </strong>
                            6 semanas
                          </div>
                          <div>
                            <strong className={styles.label}>Desde el</strong>{" "}
                            11/12/2024
                          </div>
                          <div>
                            <strong className={styles.label}>Hasta el</strong>{" "}
                            11/12/2024
                          </div>
                        </div>
                      </div>
                      <div className={styles.medicBackgroundItemFooter}>
                        <h4>Medicamentos</h4>
                        <div className={styles.medicBackgroundItemFooterList}>
                          Acetaminofen cada 8hrs, Medicina cada 2hrs, Medicina
                          cada 3hrs
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={styles.medicBackGroundListItem}>
                    <div>
                      <div className={styles.medicBackgroundItemHeader}>
                        <h4>Tratamiento #2</h4>
                        <div className={styles.medicBackgroundItemHeaderDoc}>
                          <strong>Doctor(a):</strong> Theoprhastus Von Hohenheim
                        </div>
                        <div
                          className={styles.actualTreatmentHeaderDetails}
                          style={{ fontSize: "15px" }}
                        >
                          <div>
                            <strong
                              style={{ marginRight: "4px", fontWeight: 600 }}
                            >
                              Duración:
                            </strong>
                            6 semanas
                          </div>
                          <div>
                            <strong className={styles.label}>Desde el</strong>{" "}
                            11/12/2024
                          </div>
                          <div>
                            <strong className={styles.label}>Hasta el</strong>{" "}
                            11/12/2024
                          </div>
                        </div>
                      </div>
                      <div className={styles.medicBackgroundItemFooter}>
                        <h4>Medicamentos</h4>
                        <div className={styles.medicBackgroundItemFooterList}>
                          Acetaminofen cada 8hrs, Medicina cada 2hrs, Medicina
                          cada 3hrs
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {currentSection === 1 && (
            <div className={styles.row}>
              <AddTreatmentForm />
            </div>
          )}
          {currentSection === 2 && (
            <div className={styles.row}>
              <AddExamForm />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientAdministration;
