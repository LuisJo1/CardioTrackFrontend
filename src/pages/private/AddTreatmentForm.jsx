import styles from "./styles/Form.module.css";
import addTreatmentImg from "../../assets/images/add-treatment.png";
import { useEffect, useState } from "react";
const AddTreatmentForm = () => {
  return (
    <>
      <form className={styles.form}>
        <div className={styles.formHeader}>
          <div>
            <h4 className={styles.formTitle}>Añade un tratamiento</h4>
          </div>
          <div className={styles.formHeaderImgContainer}>
            <img src={addTreatmentImg} />
          </div>
        </div>
        <div className={styles.selectExamContainer}>
          <h3>Selecciona el Examen</h3>
          <div className={styles.selectExamRow}>
            <div className={styles.searchExamContainer}>
              <div className={styles.searchExamFooter}>
                <div className={styles.searchExamSearchInputContainer}>
                  <input
                    type="text"
                    name="patientTerm"
                    placeholder="Buscar por ID"
                  />
                  <button
                    className="button-primary button-sm"
                    style={{ fontSize: "18px" }}
                  >
                    Buscar
                  </button>
                </div>
                <div className={styles.searchExamResultsContainer}>
                  <ul className={styles.searchExamList}>
                    <li className={`${styles.searchExamListItem}`}>
                      <div>
                        <div className={styles.searchExamItemHeader}>
                          <h4>Examen #1</h4>
                          <div className={styles.searchExamItemHeaderDoc}>
                            <strong>Realizado el</strong> 20/10/2024
                          </div>
                          <div
                            className={styles.actualTreatmentHeaderDetails}
                            style={{ fontSize: "15px" }}
                          >
                            <div>
                              <strong
                                style={{ marginRight: "4px", fontWeight: 600 }}
                              >
                                Diagnóstico:
                              </strong>
                              El paciente presenta condiciones especiales, por
                              tanto, se considera que es necesario aplicar los
                              siguientes procedimientos El paciente presenta
                              condiciones especiales, por tanto, se considera
                              que es necesario aplicar los siguientes
                              procedimientos condiciones especiales, por tanto,
                              se considera que es necesario aplicar los
                              siguientes procedimientos
                            </div>
                            {/* <div>
                            <strong className={styles.label}>
                              Fecha de nacimiento:
                            </strong>{" "}
                            11/12/1920
                          </div> */}
                          </div>
                          <div className={styles.searchExamIconContainer}>
                            <i className="bi bi-square"></i>
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
        <div className={styles.formSection}>
          <div className={styles.formSectionTitle}>
            Establece los detalles del tratamiento
          </div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Duración</label>
              <select name="duration" className={styles.formInput}>
                <option value={1}>1 Semana</option>
                <option value={2}>2 Semanas</option>
                <option value={3}>3 Semanas</option>
                <option value={4}>4 Semanas</option>
                <option value={5}>5 Semanas</option>
                <option value={6}>6 Semanas</option>
                <option value={7}>7 Semanas</option>
                <option value={8}>8 Semanas</option>
                <option value={9}>9 Semanas</option>
                <option value={10}>10 Semanas</option>
                <option value={11}>11 Semanas</option>
                <option value={12}>12 Semanas</option>
                <option value={13}>13 Semana</option>
                <option value={14}>14 Semanas</option>
                <option value={15}>15 Semanas</option>
                <option value={16}>16 Semanas</option>
                <option value={17}>17 Semanas</option>
                <option value={18}>18 Semanas</option>
                <option value={19}>19 Semanas</option>
                <option value={20}>20 Semanas</option>
                <option value={21}>21 Semanas</option>
                <option value={22}>22 Semanas</option>
                <option value={23}>23 Semanas</option>
                <option value={24}>24 Semanas</option>
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Descripción</label>
              <textarea
                name="description"
                className={styles.formInput}
                rows={1}
              />
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formSectionTitle}>Añade medicamentos</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Nombre de medicamento</label>
              <input
                className={styles.formInput}
                placeholder="EJ: Acetaminofen"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tomar cada</label>
              <select className={styles.formInput}>
                <option value={1}>1 hora</option>
                <option value={2}>2 horas</option>
                <option value={3}>3 horas</option>
                <option value={4}>4 horas</option>
                <option value={5}>5 horas</option>
                <option value={6}>6 horas</option>
                <option value={7}>7 horas</option>
                <option value={8}>8 horas</option>
                <option value={9}>9 horas</option>
                <option value={10}>10 horas</option>
                <option value={12}>11 horas</option>
                <option value={12}>12 horas</option>
                <option value={13}>13 horas</option>
                <option value={14}>14 horas</option>
                <option value={15}>15 horas</option>
                <option value={16}>16 horas</option>
                <option value={17}>17 horas</option>
                <option value={18}>18 horas</option>
                <option value={19}>19 horas</option>
                <option value={20}>20 horas</option>
                <option value={21}>21 horas</option>
                <option value={22}>22 horas</option>
                <option value={23}>23 horas</option>
                <option value={24}>24 horas</option>
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className={`button-primary-outline ${styles.addMedicineBtn}`}
                style={{ marginTop: "10px" }}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
              <div className={styles.medicineAdded}>
                <p>Acetaminofen - 2hrs</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={`${styles.formRow} justify-end`}>
            <button
              className="button-primary button-md"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Añadir Tratamiento
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddTreatmentForm;
