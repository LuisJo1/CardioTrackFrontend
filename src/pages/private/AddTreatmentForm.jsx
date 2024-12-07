import styles from "./styles/Form.module.css";
import InputErrorMsg from "../../components/InputErrorMsg";
import addTreatmentImg from "../../assets/images/add-treatment.png";
import { useEffect, useState } from "react";
import useGetExamsWithFilters from "../../hooks/useGetExamsWithFilters";
import PropTypes from "prop-types";
import useAddTreatmentForm from "../../hooks/useAddTreatmentForm";
import { MoonLoader } from "react-spinners";
import useIsOnMobile from "../../hooks/useIsOnMobile";
const AddTreatmentForm = ({ patient, doctor }) => {
  const { isOnMobile } = useIsOnMobile();
  function calculateDuration(treatmentDuration, medicines) {
    if (medicines.length === 0) return;
    const largestDuration = medicines.reduce((m, n) => {
      let dur = m.duration;
      if (m.durationParameter === "week") dur = dur * 7;
      let nDur = n.duration;
      if (n.durationParameter === "week") nDur = nDur * 7;

      if (dur > nDur) return dur;
      return nDur;
    }, medicines[0]);

    if (treatmentDuration.dp === "week")
      treatmentDuration.d = treatmentDuration.d * 7;

    if (treatmentDuration.d < largestDuration) {
      return { n: largestDuration, p: { ...treatmentDuration } };
    }
    return null;
  }
  const useGetExamsWithFiltersHook = useGetExamsWithFilters();
  const useAddTreatmentFormHook = useAddTreatmentForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [payload, setPayload] = useState({
    sliceIndex: 1,
    sliceSize: 1,
    examId: 0,
    doctorId: doctor?.doctor?.id,
    patientId: patient?.id
  });
  const [currentMedicine, setCurrentMedicine] = useState({
    medicineName: "",
    takeEvery: 1,
    duration: 1,
    durationParameter: "day"
  });
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    if (doctor?.doctor) {
      setPayload((prev) => ({
        ...prev,
        doctorId: doctor.doctor.id
      }));
    }
    if (patient?.id) {
      setPayload((prev) => ({
        ...prev,
        patientId: patient.id
      }));
      useAddTreatmentFormHook.handleOnChange({
        target: { name: "patientId", value: patient.id }
      });
    }
  }, [patient, doctor]);
  useEffect(() => {
    if (payload.doctorId && payload.patientId) {
      if (payload.sliceIndex > 1) {
        useGetExamsWithFiltersHook.getExamsWithFilters(payload, true);
      } else {
        useGetExamsWithFiltersHook.getExamsWithFilters(payload, false);
      }
    }
  }, [payload.sliceIndex, payload.examId]);

  useEffect(() => {
    if (selectedExam == null) {
      useAddTreatmentFormHook.handleOnChange({
        target: { name: "examId", value: 0 }
      });
    } else {
      useAddTreatmentFormHook.handleOnChange({
        target: { name: "examId", value: selectedExam.id }
      });
    }
  }, [selectedExam]);
  useEffect(() => {
    const result = calculateDuration(
      {
        d: useAddTreatmentFormHook.formValues.duration,
        dp: useAddTreatmentFormHook.formValues.durationParameter
      },
      useAddTreatmentFormHook.formValues.treatmentMedicines
    );
    if (result) {
      if (result.p.dp === "week") {
        useAddTreatmentFormHook.handleOnChange({
          target: {
            name: "duration",
            value: Number.isInteger(result.n / 7)
              ? result.n / 7
              : Math.floor(result.n / 7) + 1
          }
        });
      } else {
        useAddTreatmentFormHook.handleOnChange({
          target: {
            name: "duration",
            value: result.n
          }
        });
      }
    }
  }, [useAddTreatmentFormHook.formValues.treatmentMedicines]);
  return (
    <>
      <form
        className={styles.form}
        onSubmit={useAddTreatmentFormHook.handleSubmit}
      >
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
                    type="number"
                    name="patientTerm"
                    placeholder="Buscar por ID"
                    onChange={(ev) => {
                      setSearchTerm(ev.target.value);
                    }}
                  />
                  <button
                    className="button-primary button-sm"
                    style={{ fontSize: "18px" }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPayload((prev) => ({
                        ...prev,
                        sliceIndex: 1,
                        examId: Number(searchTerm)
                      }));
                    }}
                  >
                    Buscar
                    <MoonLoader
                      color="#fff"
                      loading={useGetExamsWithFiltersHook.isLoading}
                      size={16}
                    />
                  </button>
                </div>
                <div className={styles.searchExamResultsContainer}>
                  {!useGetExamsWithFiltersHook.isLoading &&
                    useGetExamsWithFiltersHook.success &&
                    useGetExamsWithFiltersHook.data.count == 0 && (
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
                  <ul className={styles.searchExamList}>
                    {useGetExamsWithFiltersHook.data?.results?.map((exam) => (
                      <li
                        key={exam.id}
                        className={`${styles.searchExamListItem} ${
                          selectedExam?.id === exam.id ? styles.selected : ""
                        }`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          if (selectedExam?.id === exam.id) {
                            setSelectedExam(null);
                          } else {
                            setSelectedExam(exam);
                          }
                        }}
                      >
                        <div>
                          <div className={styles.searchExamItemHeader}>
                            <h4>Examen #{exam.id}</h4>
                            <div className={styles.searchExamItemHeaderDoc}>
                              <strong>Realizado el</strong>{" "}
                              {new Date(
                                exam.evaluationDate
                              ).toLocaleDateString()}
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
                                  Diagnóstico:
                                </strong>
                                {exam.interventionProposed}
                              </div>
                            </div>
                            <div className={styles.searchExamIconContainer}>
                              {selectedExam?.id === exam.id ? (
                                <i className="bi bi-check-square-fill"></i>
                              ) : (
                                <i className="bi bi-square"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!useGetExamsWithFiltersHook.isLoading &&
                  useGetExamsWithFiltersHook.success &&
                  useGetExamsWithFiltersHook.data?.results.length <
                    useGetExamsWithFiltersHook.data?.count ? (
                    <div className={styles.searchLoadMoreBtnContainer}>
                      <button
                        className="button-white button-sm"
                        disabled={useGetExamsWithFiltersHook.isLoading}
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPayload((prev) => ({
                            ...prev,
                            sliceIndex: prev.sliceIndex + 1
                          }));
                        }}
                      >
                        Cargar más
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
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
              <input
                name="duration"
                type="number"
                min={1}
                value={useAddTreatmentFormHook.formValues.duration}
                className={styles.formInput}
                onChange={(ev) => {
                  useAddTreatmentFormHook.handleOnChange({
                    target: {
                      name: ev.target.name,
                      value: Number(ev.target.value)
                    }
                  });
                }}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Parámetro de duración</label>
              <select
                name="durationParameter"
                onChange={useAddTreatmentFormHook.handleOnChange}
                className={styles.formInput}
                value={useAddTreatmentFormHook.formValues.durationParameter}
              >
                <option value={"day"}>Días</option>
                <option value={"week"}>Semanas</option>
              </select>
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
                type="text"
                name="medicineName"
                value={currentMedicine.medicineName}
                onChange={(ev) => {
                  setCurrentMedicine((prev) => ({
                    ...prev,
                    [ev.target.name]: ev.target.value
                  }));
                }}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Tomar cada</label>
              <select
                name="takeEvery"
                className={styles.formInput}
                value={currentMedicine.takeEvery}
                onChange={(ev) => {
                  setCurrentMedicine((prev) => ({
                    ...prev,
                    [ev.target.name]: Number(ev.target.value)
                  }));
                }}
              >
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
                <option value={11}>11 horas</option>
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
              <label className={styles.formLabel}>Durante</label>
              <input
                name="duration"
                type="number"
                min={1}
                value={currentMedicine.duration}
                className={styles.formInput}
                onChange={(ev) => {
                  setCurrentMedicine((prev) => ({
                    ...prev,
                    [ev.target.name]: Number(ev.target.value)
                  }));
                }}
              />
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}>Parámetro de duración</label>
              <select
                name="durationParameter"
                type="number"
                className={styles.formInput}
                onChange={(ev) => {
                  setCurrentMedicine((prev) => ({
                    ...prev,
                    [ev.target.name]: ev.target.value
                  }));
                }}
                value={currentMedicine.durationParameter}
              >
                <option value={"day"}>Días</option>
                <option value={"week"}>Semanas</option>
              </select>
            </div>
            <div className={styles.formFieldContainer}>
              <label className={styles.formLabel}></label>
              {!isOnMobile && (
                <button
                  className={`button-primary-outline ${styles.addMedicineBtn} button-md`}
                  style={{ marginTop: "10px" }}
                  disabled={
                    !Object.values(currentMedicine).every(
                      (val) => val.length > 0 || val > 0
                    ) ||
                    useAddTreatmentFormHook.formValues.treatmentMedicines?.find(
                      (m) =>
                        m.medicineName?.toLowerCase() ===
                        currentMedicine.medicineName?.toLowerCase()
                    )
                  }
                  onClick={(ev) => {
                    ev.preventDefault();
                    setCurrentMedicine({
                      duration: 1,
                      durationParameter: "day",
                      medicineName: "",
                      takeEvery: 1
                    });
                    useAddTreatmentFormHook.handleOnChange({
                      target: {
                        name: "treatmentMedicines",
                        value: [
                          ...useAddTreatmentFormHook.formValues
                            .treatmentMedicines,
                          currentMedicine
                        ]
                      }
                    });
                  }}
                >
                  Añadir
                </button>
              )}
            </div>
          </div>
          <InputErrorMsg
            show={useAddTreatmentFormHook.errors.treatmentMedicines.length > 0}
            message={useAddTreatmentFormHook.errors.treatmentMedicines}
          />
          {isOnMobile && (
            <div className={styles.formRow}>
              <button
                className={`button-primary-outline ${styles.addMedicineBtn} button-md`}
                style={{ marginTop: "10px" }}
                disabled={
                  !Object.values(currentMedicine).every(
                    (val) => val.length > 0 || val > 0
                  ) ||
                  useAddTreatmentFormHook.formValues.treatmentMedicines?.find(
                    (m) =>
                      m.medicineName?.toLowerCase() ===
                      currentMedicine.medicineName?.toLowerCase()
                  )
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setCurrentMedicine({
                    duration: 1,
                    durationParameter: "day",
                    medicineName: "",
                    takeEvery: 1
                  });
                  useAddTreatmentFormHook.handleOnChange({
                    target: {
                      name: "treatmentMedicines",
                      value: [
                        ...useAddTreatmentFormHook.formValues
                          .treatmentMedicines,
                        currentMedicine
                      ]
                    }
                  });
                }}
              >
                Añadir
              </button>
            </div>
          )}
          <div className={styles.formRow}>
            <div className={styles.medicinesAddedContainer}>
              {useAddTreatmentFormHook.formValues.treatmentMedicines.map(
                (m) => (
                  <div key={m?.medicineName} className={styles.medicineAdded}>
                    <div className={styles.medicineAddedTop}>
                      <p>{`${m.medicineName} / ${m.takeEvery} hrs`}</p>
                      <p style={{ fontSize: "13px" }}>
                        Durante {m.duration}{" "}
                        {m.durationParameter === "week" ? "semanas" : "días"}
                      </p>
                    </div>
                    <div className={styles.medicineAddedBtn}>
                      <i
                        className="bi bi-x-circle"
                        onClick={(ev) => {
                          ev.preventDefault();
                          useAddTreatmentFormHook.handleOnChange({
                            target: {
                              name: "treatmentMedicines",
                              value: [
                                ...useAddTreatmentFormHook.formValues.treatmentMedicines.filter(
                                  (el) => el.medicineName !== m.medicineName
                                )
                              ]
                            }
                          });
                        }}
                      ></i>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.formSectionTitle}>Añade una descripción</div>
          <div className={styles.formRow}>
            <div className={styles.formFieldContainer}>
              <div className={styles.formLabel}>Descripción</div>
              <textarea
                className={styles.formInput}
                rows={4}
                style={{
                  resize: "vertical",
                  fontFamily: "arial",
                  fontSize: "15px",
                  color: "#2b2b2bee"
                }}
                name="description"
                onChange={useAddTreatmentFormHook.handleOnChange}
              ></textarea>
            </div>
          </div>
          <InputErrorMsg
            show={useAddTreatmentFormHook.errors.examId.length > 0}
            message={useAddTreatmentFormHook.errors.examId}
          />
        </div>
        <div className={styles.formSection}>
          <div className={`${styles.formRow} justify-end`}>
            <button
              className="button-primary button-md"
              style={{ fontSize: "16px", fontWeight: 600 }}
              disabled={
                useAddTreatmentFormHook.isLoading ||
                Object.values(useAddTreatmentFormHook.errors).some(
                  (e) => e.length > 0
                )
              }
            >
              Añadir Tratamiento
              <MoonLoader
                color="#fff"
                loading={useAddTreatmentFormHook.isLoading}
                size={16}
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddTreatmentForm;

AddTreatmentForm.propTypes = {
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired
};
