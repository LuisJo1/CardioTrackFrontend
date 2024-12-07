import { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function validateField(field, value) {
  
  if(field === "examId") {
    if(value == 0) return "Selecciona un examen"
  }
  if(field === "treatmentMedicines"){
    if(value.length === 0) return "Es necesario al menos un medicamento"
  }
  return ""
}
function useAddTreatmentForm() {
  const navigate = useNavigate()
  const api = API
  const [formValues, setFormValues] = useState({
    description: "",
    duration: 1,
    durationParameter: "day",
    examId: 0,
    treatmentMedicines: [],
    patientId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({
    examId: "",
    serviceError: "",
    treatmentMedicines: ""
  });
  useEffect(() => {
    if(Object.values(errors).every(el => el.length === 0) && submit) {
      callService()
    } else {
      setSubmit(false)
    }
  }, [errors])

  function handleOnChange(ev) {
    const {name, value} = ev.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
      ["serviceError"]: ""
    }))
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }
  async function callService() {
    try {
      setIsLoading(true)
      const response = await fetch(`${api.URL}/exam/addtreatment`, {
        method: "POST",
        body: JSON.stringify(formValues),
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      });

      setIsLoading(false)
      setSubmit(false);
      const json = await response.json();
      if(json.statusCode > 305) {
        setErrors(prev => ({
          ...prev,
          ["serviceError"]: json.message
        }))
        return;
      }

      console.log(json)
      Swal.fire({
        title: "¡Se ha añadido el tratamiento satisfactoriamente!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
          navigate("/dashboard")
      }).catch(err => {
        console.log(err)
        navigate("/dashboard")
      })
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        ["serviceError"]: error
      }))
      setSubmit(false);
      setIsLoading(false);
      console.log(error);
    }

  }
  function handleSubmit(ev) {
    ev.preventDefault();
    setSubmit(true)
    Object.entries(formValues).forEach(formVal => {
      const error = validateField(formVal[0], formVal[1])
      setErrors(prev => ({
        ...prev,
        [formVal[0]]: error
      }))
    })
  }
  return {
    formValues,
    isLoading,
    success,
    submit,
    errors,
    handleOnChange,
    handleSubmit
  }
}
export default useAddTreatmentForm;