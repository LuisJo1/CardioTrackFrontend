import styles from "./styles/Form.module.css";
import thisStyles from "./styles/AddExamForm.module.css";
import exam from "../../assets/images/exam.png";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import personalBackgroundOptions from "../../personalBackground.js";
import useAddExamForm from "../../hooks/useAddExamForm.js";
import useFormSpecifyInput from "../../hooks/useFormSpecifyInput.js";
import { MoonLoader } from "react-spinners";
const AddExamForm = ({ patient }) => {
  const useAddExamFormHook = useAddExamForm();
  const otherPersonalBackground = useFormSpecifyInput();
  const allergicMedicines = useFormSpecifyInput();
  const toxics = useFormSpecifyInput();
  const passMedicines = useFormSpecifyInput();
  const familyBackground = useFormSpecifyInput();
  const [currentSelection, setCurrentSelection] = useState("");
  const [selections, setSelections] = useState([]);
  const checkIsOnMobile = () => {
    return window.matchMedia("(max-width: 868px)").matches;
  };
  const [isOnMobile, setIsOnMobile] = useState(checkIsOnMobile);
  useEffect(() => {
    window.addEventListener("resize", setIsOnMobile(checkIsOnMobile));

    return () => {
      window.removeEventListener("resize", setIsOnMobile(checkIsOnMobile));
    };
  }, []);
  useEffect(() => {
    useAddExamFormHook.handleOnChange(
      {
        target: {
          name: "otherPersonalBackground",
          value: otherPersonalBackground.entries
        }
      },
      true
    );
    useAddExamFormHook.handleOnChange(
      {
        target: {
          name: "allergicMedicines",
          value: allergicMedicines.entries
        }
      },
      true
    );
    useAddExamFormHook.handleOnChange(
      {
        target: {
          name: "toxicsList",
          value: toxics.entries
        }
      },
      true
    );
    useAddExamFormHook.handleOnChange(
      {
        target: {
          name: "medicines",
          value: passMedicines.entries
        }
      },
      true
    );
    useAddExamFormHook.handleOnChange(
      {
        target: {
          name: "familyBackgroundList",
          value: familyBackground.entries
        }
      },
      true
    );
  }, [
    otherPersonalBackground.entries,
    allergicMedicines.entries,
    toxics.entries,
    passMedicines.entries,
    familyBackground.entries
  ]);
  useEffect(() => {
    if (patient !== null) {
      useAddExamFormHook.handleOnChange({
        target: { name: "patientId", value: patient.id }
      });
    }
  }, [patient]);
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
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
                value={`${patient?.names} ${patient?.surnames}`}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Edad</label>
              <input
                className={styles.formInput}
                type="text"
                name="age"
                disabled
                value={`${patient?.age}`}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Sexo</label>
              <input
                className={styles.formInput}
                type="text"
                name="genre"
                disabled
                value={`${patient?.genre}`}
              />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Antecendes personales</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Antecedente</label>
              <select
                className={styles.formInput}
                onChange={(ev) => {
                  setCurrentSelection(ev.target.value);
                }}
              >
                <option>Antecedente</option>
                {personalBackgroundOptions.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  if (currentSelection !== "") {
                    useAddExamFormHook.handleOnChangeOnSelection(
                      currentSelection
                    );
                    setSelections((prev) => [
                      ...prev,
                      personalBackgroundOptions.find(
                        (op) => op.value === currentSelection
                      )
                    ]);
                    setCurrentSelection("");
                  }
                }}
                disabled={
                  selections.some((op) => op.value === currentSelection) ||
                  currentSelection.length === 0
                }
                className={`button-primary-outline button-md ${styles.addMedicineBtn}`}
                style={{ marginTop: "10px" }}
              >
                Añadir Antecendete
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {selections?.map((selection) => (
                <div key={selection?.value} className={styles.medicineAdded}>
                  <p>{selection?.key}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        useAddExamFormHook.handleOnChangeOnSelection(
                          selection?.value
                        );
                        setSelections((sel) =>
                          sel.filter((sel) => sel.value !== selection?.value)
                        );
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Otros antecedentes</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Antecedente</label>
              <input
                className={styles.formInput}
                name="other"
                type="text"
                onChange={(ev) => {
                  otherPersonalBackground.changeCurrentVal(ev.target.value);
                }}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
                onClick={() => {
                  otherPersonalBackground.addEntry();
                }}
              >
                {isOnMobile ? "Añadir" : "Añadir otro antecedente"}
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {otherPersonalBackground.entries?.map((el) => (
                <div key={el} className={styles.medicineAdded}>
                  <p>{el}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        otherPersonalBackground.removeEntry(el);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
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
                  name="surgery"
                  id="surgery"
                  value={true}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: true } },
                      true
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="surgery">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="surgery"
                  value={false}
                  id="surgery2"
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: false } },
                      true
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="surgery2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tipo de cirugía</label>
              <input
                className={styles.formInput}
                type="text"
                name="surgeryType"
                onChange={(ev) => {
                  useAddExamFormHook.handleOnChange(ev, true);
                }}
              />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Obstétricos</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Gesta</label>
              <input
                className={styles.formInput}
                name="gestationWeeks"
                onChange={(ev) => {
                  useAddExamFormHook.handleOnChange(ev, false, true);
                }}
                type="text"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Para</label>
              <input
                className={styles.formInput}
                type="text"
                name="for"
                onChange={(ev) => {
                  useAddExamFormHook.handleOnChange(ev, false, true);
                }}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tipo de parto</label>
              <select
                className={styles.formInput}
                onChange={(ev) => {
                  useAddExamFormHook.handleOnChange(
                    { target: { name: "stillbirth", value: false } },
                    false,
                    true
                  );
                  useAddExamFormHook.handleOnChange(
                    { target: { name: "caesarean", value: false } },
                    false,
                    true
                  );
                  useAddExamFormHook.handleOnChange(
                    { target: { name: "abortion", value: false } },
                    false,
                    true
                  );

                  useAddExamFormHook.handleOnChange(
                    { target: { name: ev.target.value, value: true } },
                    false,
                    true
                  );
                }}
              >
                <option>Seleccione</option>
                <option value={"caesarean"}>Cesárea</option>
                <option value={"stillbirth"}>Mortinato</option>
                <option value={"abortion"}>Aborto</option>
              </select>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="caesarean"
                  id="caesarean"
                  value="true"
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(ev, false, true);
                    useAddExamFormHook.handleOnChange(
                      { target: { name: "stillbirth", value: "false" } },
                      false,
                      true
                    );
                    useAddExamFormHook.handleOnChange(
                      { target: { name: "abortion", value: "false" } },
                      false,
                      true
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="caesarean">
                  Cesárea
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stillbirth"
                  id="stillbirth"
                  value={true}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(ev, false, true);
                    useAddExamFormHook.handleOnChange(
                      { target: { name: "caesarean", value: "false" } },
                      false,
                      true
                    );
                    useAddExamFormHook.handleOnChange(
                      { target: { name: "abortion", value: "false" } },
                      false,
                      true
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="stillbirth">
                  Martinato
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="obstetricType"
                  id="flexRadioDefault2"
                  value={"abort"}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Aborto
                </label>
              </div> */}
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
                  name="medicineAllergy"
                  value={true}
                  id="medicineAllergy"
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: true } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="medicineAllergy">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="medicineAllergy"
                  id="medicineAllergy2"
                  value={false}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: false } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="medicineAllergy2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Medicamento</label>
              <input
                className={styles.formInput}
                onChange={(ev) => {
                  allergicMedicines.changeCurrentVal(ev.target.value);
                }}
                type="text"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
                onClick={() => {
                  allergicMedicines.addEntry();
                }}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {allergicMedicines.entries?.map((el) => (
                <div key={el} className={styles.medicineAdded}>
                  <p>{el}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        allergicMedicines.removeEntry(el);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
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
                  name="toxics"
                  id="toxics"
                  value={true}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: true } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="toxics">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="toxics"
                  id="toxics2"
                  value={false}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: false } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="toxics2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tóxico</label>
              <input
                className={styles.formInput}
                onChange={(ev) => {
                  toxics.changeCurrentVal(ev.target.value);
                }}
                type="text"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
                onClick={() => {
                  toxics.addEntry();
                }}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {toxics.entries?.map((el) => (
                <div key={el} className={styles.medicineAdded}>
                  <p>{el}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toxics.removeEntry(el);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Medicamentos pasados</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Medicamento</label>
              <input
                className={styles.formInput}
                onChange={(ev) => {
                  passMedicines.changeCurrentVal(ev.target.value);
                }}
                type="text"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
                onClick={() => {
                  passMedicines.addEntry();
                }}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {passMedicines.entries?.map((el) => (
                <div key={el} className={styles.medicineAdded}>
                  <p>{el}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        passMedicines.removeEntry(el);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
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
                  name="familyBackground"
                  id="familyBackground"
                  value={true}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: true } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="familyBackground">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="familyBackground"
                  id="familyBackground2"
                  value={false}
                  onChange={(ev) => {
                    useAddExamFormHook.handleOnChange(
                      { target: { name: ev.target.name, value: false } },
                      true,
                      false
                    );
                  }}
                />
                <label className="form-check-label" htmlFor="familyBackground2">
                  No
                </label>
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Antecedente</label>
              <input
                className={styles.formInput}
                onChange={(ev) => {
                  familyBackground.changeCurrentVal(ev.target.value);
                }}
                type="text"
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              <button
                className="button-primary-outline button-md"
                style={{ fontSize: "15px" }}
                onClick={() => {
                  familyBackground.addEntry();
                }}
              >
                Añadir
              </button>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {familyBackground.entries?.map((el) => (
                <div key={el} className={styles.medicineAdded}>
                  <p>{el}</p>
                  <div className={styles.medicineAddedBtn}>
                    <i
                      className="bi bi-x-circle"
                      onClick={(ev) => {
                        ev.preventDefault();
                        familyBackground.removeEntry(el);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={styles.formSectionTitle}>Intervención propuesta</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Intervención</label>
              <textarea
                name="interventionProposed"
                style={{ fontFamily: "arial", resize: "vertical" }}
                className={styles.formInput}
                onChange={(ev) => {
                  useAddExamFormHook.handleOnChange(ev);
                }}
                rows={2}
              />
            </div>
          </div>
        </div>
        <div className={thisStyles.formSection}>
          <div className={`${styles.formRow} justify-end`}>
            <button
              className="button-primary button-md"
              style={{ fontSize: "16px", fontWeight: 600 }}
              disabled={
                Object.values(useAddExamFormHook.errors).some(
                  (el) => el.length > 0
                ) || useAddExamFormHook.isLoading
              }
              onClick={(ev) => {
                useAddExamFormHook.handleSubmit(ev);
              }}
            >
              Crear Nuevo Examen
              <MoonLoader
                color="#fff"
                loading={useAddExamFormHook.isLoading}
                size={16}
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddExamForm;
AddExamForm.propTypes = {
  patient: PropTypes.object.isRequired
};
