import PropTypes from "prop-types";
import styles from "../pages/private/styles/Form.module.css";
const InputErrorMsg = ({ show, message }) => {
  if (show) return <div className={styles.formErrorMsg}>{message}</div>;
  else return <></>;
};
export default InputErrorMsg;

InputErrorMsg.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};
