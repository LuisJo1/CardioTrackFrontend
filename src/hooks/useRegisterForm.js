import { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function validateField(field, value) {
  if(field === "email") {
    if(value.length < 1 || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value)) {
      return "Email invalido"
    }
  }
  if(field === "password") {
    if(value.length < 1 || value.length < 6) return "Contraseña invalida"
  }
  if(field === "names" || field === "surnames" || field === "genre" || field === "ci") {
    if(value.length < 1) return "El campo es requerido"
  }
  return ""
}
function useRegisterForm() {
  const navigate = useNavigate()
  const api = API
  const [formValues, setFormValues] = useState({
    names: "",
    surnames: "",
    ci: "",
    bornDate: "",
    genre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({
    names: "",
    surnames: "",
    ci: "",
    bornDate: "",
    genre: "",
    email: "",
    password: "",
    confirmPassword: "",
    serviceError: ""
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
    if(name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        ["password"]: ""
      }))
    }
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
      const response = await fetch(`${api.URL}/patient/addpatient`, {
        method: "POST",
        body: JSON.stringify({...formValues, bornDate: getDateFormatted(formValues.bornDate)}),
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
        title: "¡Te has registrado con éxito!",
        icon: "success",
        confirmButtonText: "Ir a inicio de sesión",
      }).then(() => {
          navigate("/login")
      }).catch(err => {
        console.log(err)
        navigate("/login")
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
    if(formValues.password !== formValues.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        ["password"]: "Las contraseñas no coinciden"
      }))
    }
  }

  function getDateFormatted(date) {
    const dateObj = new Date(date);
    const localDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
    const dateFormatted = `${localDate.getFullYear()}/${(localDate.getMonth() + 1).toString().padStart(2, "0")}/${localDate.getDate().toString().padStart(2, "0")}`;
    console.log(dateFormatted);
    return dateFormatted;
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
export default useRegisterForm;