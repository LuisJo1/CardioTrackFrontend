// import { useState } from "react";

import medicineImg from "../../assets/images/medicine.png";
import medicExamImg from "../../assets/images/medic-exam.png";
import doctorImg from "../../assets/images/doctor.png";
import medicBackgroundImg from "../../assets/images/medic-background.png";
import styles from "./styles/ProfilePatient.module.css";
import "../../App.css";
import imgPerfil from "../../assets/images/perfil-1.jpg";

const ProfilePatient = () => {
  // const [first, setfirst] = useState(null);

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
            <h2 className={styles.namePersonalData}>Oscar Gonzales</h2>
            <h3>
              <strong className={styles.labelPersonalData}>C.I:</strong>{" "}
              22455676
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Género:</strong> M
            </h3>
            <h3>
              <strong className={styles.labelPersonalData}>Edad:</strong> 28
            </h3>
          </div>
          <div className={styles.footerPersonalData}>
            <button className={"button-white"}>Cerrar sesión</button>
          </div>
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.helloMainPanel}>
            Bienvenido, Oscar Gonzales
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
          <div className={styles.row}>
            <div className={styles.actualTreatment}>
              <div className={styles.actualTreatmentTop}>
                <h4>Tu tratamiento actual</h4>
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
                <h4>Tu historial médico</h4>
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
          <div className={styles.row}>
            <div className={styles.doctorAttendingContainer}>
              <div className={styles.doctorAttendingHeader}>
                <h4>
                  Estás siendo atentido por
                  <br /> el Dr Juan Caceres
                </h4>
                <div className={styles.doctorAttendingHeaderImgContainer}>
                  <img src={doctorImg} />
                </div>
              </div>
              <div className={styles.doctorAttendingFooter}>
                <h4>Especializado en Pulmonía</h4>
                <div className={styles.doctorAttendingFooterDetails}>
                  <div className={styles.doctorAttendingFooterDetailsExams}>
                    <div
                      className={
                        styles.doctorAttendingFooterDetailsExamsImgContainer
                      }
                    >
                      <img src={medicExamImg} />
                    </div>
                    <p>24 Exámenes realizados desde el 20/03/2024</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.card}>
              <div
                className={styles.cardHeader}
                style={{ backgroundColor: "#ff000018" }}
              >
                <h4
                  className={styles.cardHeaderTitle}
                  style={{ color: "#ff000090" }}
                >
                  24 Exámenes Realizados
                </h4>
                <div className={styles.cardImgContainer}>
                  <img src={medicExamImg} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePatient;
