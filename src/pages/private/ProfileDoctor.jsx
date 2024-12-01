import styles from "./styles/ProfileDoctor.module.css";
import patientImg from "../../assets/images/patient.png";
import patientListImg from "../../assets/images/patient-list.png";
import imgPerfil from "../../assets/images/perfil-1.jpg";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProfileDoctor = () => {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  useEffect(() => {
    if (isAddPatientModalOpen) {
      Swal.fire({
        title: "¿Estás seguro de añadir este paciente?",
        html: `
        <div>
        <div>Añadirás al paciente Antonin Artaud</div>
        <div><strong style="font-weight: 600;">CI:</strong>123456789</div>
        </div>
        `,
        confirmButtonText: "Sí, añadir paciente",
        cancelButtonTextL: "No, cancelar",
        showCancelButton: true
      }).then((resp) => {
        if (resp.isConfirmed) {
          alert("Añadido");
        } else {
          setIsAddPatientModalOpen(false);
        }
      });
    }
  }, [isAddPatientModalOpen]);
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
            Bienvenido, Theophrastus Aeroulus Von
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
              <h5>Theophrastus Aeroulus Von</h5>
              <h6>cardiologo@gmail.com</h6>
              <div>
                <strong>CI:</strong>
                123456789
              </div>
              <div>
                <strong>Especialidad:</strong>Cardiologo
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
                <div className={styles.searchPatientResultsContainer}>
                  <ul className={styles.searchPatientList}>
                    <li className={styles.searchPatientListItem}>
                      <div>
                        <div className={styles.searchPatientItemHeader}>
                          <h4>Antonin Artaud</h4>
                          <div className={styles.searchPatientItemHeaderDoc}>
                            <strong>CI:</strong> 123456789
                          </div>
                          <div
                            className={styles.actualTreatmentHeaderDetails}
                            style={{ fontSize: "15px" }}
                          >
                            <div>
                              <strong
                                style={{ marginRight: "4px", fontWeight: 600 }}
                              >
                                Edad:
                              </strong>
                              24 años
                            </div>
                            <div>
                              <strong className={styles.label}>
                                Fecha de nacimiento:
                              </strong>{" "}
                              11/12/1920
                            </div>
                          </div>
                          <div className={styles.searchPatientIconContainer}>
                            <i className="bi bi-arrow-right-square-fill"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
                  />
                  <button
                    className="button-primary button-sm"
                    style={{ fontSize: "18px" }}
                  >
                    Buscar
                  </button>
                </div>
                <div className={styles.searchPatientResultsContainer}>
                  <ul className={styles.searchPatientList}>
                    <li
                      className={`${styles.searchPatientListItem}`}
                      onClick={() => {
                        setIsAddPatientModalOpen(true);
                      }}
                    >
                      <div>
                        <div className={styles.searchPatientItemHeader}>
                          <h4>Antonin Artaud</h4>
                          <div className={styles.searchPatientItemHeaderDoc}>
                            <strong>CI:</strong> 123456789
                          </div>
                          <div
                            className={styles.actualTreatmentHeaderDetails}
                            style={{ fontSize: "15px" }}
                          >
                            <div>
                              <strong
                                style={{ marginRight: "4px", fontWeight: 600 }}
                              >
                                Edad:
                              </strong>
                              24 años
                            </div>
                            <div>
                              <strong className={styles.label}>
                                Fecha de nacimiento:
                              </strong>{" "}
                              11/12/1920
                            </div>
                          </div>
                          <div className={styles.searchPatientIconContainer}>
                            <i className="bi bi-plus-square-fill"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
