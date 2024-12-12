import PropTypes from "prop-types";
import styles from "../pages/private/styles/ProfilePatient.module.css";
import personalBackgroundOptions from "../personalBackground";
const ExamItemList = ({ exam, patient }) => {
  const pBOptions = personalBackgroundOptions;
  return (
    <li key={exam?.id} className={styles.medicBackGroundListItem}>
      <div>
        <div className={styles.medicBackgroundItemHeader}>
          <h4 style={{ color: "#FE2121ee" }}>Examen #{exam?.id}</h4>
          <div
            className={`${styles.medicBackgroundItemHeaderDoc} ItemHeaderTwo`}
          >
            <strong>Doctor(a):</strong>{" "}
            {`${exam?.doctor.names} ${exam?.doctor.surnames}`}
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
                Realizado el:
              </strong>
              {new Date(exam?.evaluationDate ?? "").toLocaleDateString()}
            </div>
            <div>
              <strong
                style={{
                  marginRight: "4px",
                  fontWeight: 600
                }}
              >
                Nombre del paciente:
              </strong>
              {`${patient?.names} ${patient?.surnames}`}
            </div>
            <div>
              <strong
                style={{
                  marginRight: "4px",
                  fontWeight: 600
                }}
              >
                Edad:
              </strong>
              {patient?.age}
            </div>
            <div>
              <strong
                style={{
                  marginRight: "4px",
                  fontWeight: 600
                }}
              >
                Genero:
              </strong>
              {patient?.genre}
            </div>
          </div>
        </div>
        <div className={styles.medicBackgroundItemFooter}>
          <div
            className="ItemRow"
            style={{ margin: "10px 0", padding: 0, border: 0 }}
          >
            <h4 className="ItemHeaderThree">Intervención propuesta</h4>
            <div
              style={{
                fontSize: "15px",
                color: "#000"
              }}
            >
              {exam?.interventionProposed}
            </div>
          </div>
          <div className={styles.medicBackgroundItemFooterList}>
            <table className={styles.actualTreatmentMedicinesTable}>
              <thead>
                <tr>
                  <th>Antecedente</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {pBOptions?.map((pb) => (
                  <tr key={pb.key}>
                    <td>{pb.key}</td>
                    <td>{exam?.personalBackground[pb.value] ? "Sí" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ItemRow" style={{ margin: "10px 0" }}>
              <h4 className="ItemHeaderThree">Otros</h4>
              <div
                style={{
                  fontSize: "15px",
                  color: "#000",
                  padding: "4px 0px 0 4px"
                }}
              >
                {exam?.personalBackground.otherPersonalBackground.length == 0
                  ? "Ninguno"
                  : exam?.personalBackground.otherPersonalBackground?.join(
                      ", "
                    )}
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Cirugía</h4>
              <div className="detailsRow">
                <div style={{ borderBottom: "1px solid black" }}>
                  {exam?.personalBackground.surgery ? "Sí" : "No"}
                </div>
                <div style={{ fontWeight: 500 }}>
                  Tipo de cirugía:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.surgeryType}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Obstétricos</h4>
              <div className="detailsRow">
                <div style={{ fontWeight: 500 }}>
                  Gesta:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.gestationWeeks}
                  </span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  Para:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.for}
                  </span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  Cesárea:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.caesarean ? "Sí" : "No"}
                  </span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  Mortinato:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.stillbirth ? "Sí" : "No"}
                  </span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  Aborto:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.abortion ? "Sí" : "No"}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Alergía a medicamentos</h4>
              <div className="detailsRow">
                <div style={{ borderBottom: "1px solid black" }}>
                  {exam?.personalBackground.medicineAllergy ? "Sí" : "No"}
                </div>
                <div style={{ fontWeight: 500 }}>
                  Medicamentos:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.allergicMedicines.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Tóxicos</h4>
              <div className="detailsRow">
                <div style={{ borderBottom: "1px solid black" }}>
                  {exam?.personalBackground.toxics ? "Sí" : "No"}
                </div>
                <div style={{ fontWeight: 500 }}>
                  Tóxicos:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.toxicsList.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Medicamentos</h4>
              <div className="detailsRow">
                <div style={{ fontWeight: 500 }}>
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.medicines.length === 1 &&
                    exam?.personalBackground.medicines[0] === ""
                      ? "Ninguno"
                      : exam?.personalBackground.medicines.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="ItemRow"
              style={{ margin: "10px 0", fontSize: "16px" }}
            >
              <h4 className="ItemHeaderThree">Antecedentes familiares</h4>
              <div className="detailsRow">
                <div style={{ borderBottom: "1px solid black" }}>
                  {exam?.personalBackground.familyBackground ? "Sí" : "No"}
                </div>
                <div style={{ fontWeight: 500 }}>
                  Antecendes:
                  <span
                    style={{
                      fontWeight: 400,
                      borderBottom: "1px solid black",
                      marginLeft: "4px"
                    }}
                  >
                    {exam?.personalBackground.familyBackgroundList.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ExamItemList;

ExamItemList.propTypes = {
  exam: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired
};
