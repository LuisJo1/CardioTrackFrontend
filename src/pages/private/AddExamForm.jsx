import styles from "./styles/Form.module.css";
import thisStyles from "./styles/AddExamForm.module.css";
import exam from "../../assets/images/exam.png";
const AddExamForm = () => {
  return (
    <>
      <form className={styles.form}>
        <div className={styles.formHeader}>
          <div>
            <h4 className={styles.formTitle}>Añade un Examen</h4>
          </div>
          <div className={styles.formHeaderImgContainer}>
            <img src={exam} />
          </div>
        </div>

        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Datos del paciente</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Nombre</label>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                disabled
                value={"Antonin Artaud"}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Edad</label>
              <input
                className={styles.formInput}
                type="text"
                name="age"
                disabled
                value={"24"}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Sexo</label>
              <input
                className={styles.formInput}
                type="text"
                name="genre"
                disabled
                value={"M"}
              />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Antecendes personales</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Antecedente</label>
              <select className={styles.formInput}>
                <option value={1}>HTA</option>
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className={`button-primary-outline ${styles.addMedicineBtn}`}
                style={{ marginTop: "10px" }}
              >
                Añadir Antecendete
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              <div className={styles.medicineAdded}>
                <p>HTA</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Otros antecedentes</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Antecedente</label>
              <input className={styles.formInput} name="other" type="text" />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
              >
                Añadir otro antecedente
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              <div className={styles.medicineAdded}>
                <p>Condición</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Cirugía</div>
          <div className={styles.formRow}>
            <div
              className={styles.formFieldContainer}
              style={{
                width: "auto",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tipo de cirugía</label>
              <input className={styles.formInput} type="text" />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Obstétricos</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Gesta</label>
              <input className={styles.formInput} type="text" />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Para</label>
              <input className={styles.formInput} type="text" />
            </div>
            <div
              className={styles.formFieldContainer}
              style={{
                width: "auto",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Cesárea
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Martinato
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Aborto
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Alergía a medicamentos</div>
          <div className={styles.formRow}>
            <div
              className={styles.formFieldContainer}
              style={{
                width: "auto",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>
                Especifique los medicamentos
              </label>
              <input className={styles.formInput} type="text" />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Tóxicos</div>
          <div className={styles.formRow}>
            <div
              className={styles.formFieldContainer}
              style={{
                width: "auto",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>
                Especifíque los tóxicos
              </label>
              <input className={styles.formInput} type="text" />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Medicamentos pasados</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Medicamento</label>
              <input className={styles.formInput} name="other" type="text" />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
              >
                Añadir Medicamento
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              <div className={styles.medicineAdded}>
                <p>Medicamento</p>
                <div className={styles.medicineAddedBtn}>
                  <i className="bi bi-x-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Antecedentes familiares</div>
          <div className={styles.formRow}>
            <div
              className={styles.formFieldContainer}
              style={{
                width: "auto",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>
                Específique los antecedentes
              </label>
              <input className={styles.formInput} type="text" />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={`${styles.formRow} justify-end`}>
            <button
              className="button-primary button-md"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Crear Nuevo Examen
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddExamForm;
