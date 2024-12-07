import { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../routes/AuthContext";
function validateField(field, value) {
  if(field === 'email') {
    if(value.length < 0 || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value)) {
      return "Email invalido"
    }
  }
  if(field === "password") {
    if(value.length < 0 || value.length < 6) return 'Contraseña invalida'
  }
  return ""
}
function useLoginForm() {
  const value = useContext(AuthContext)
  const navigate = useNavigate()
  const api = API
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    serviceError: ""
  })

  function handleOnChange(ev) {
    const {name, value} = ev.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name + "Error"]: error,
      ['serviceError']: ''
    }))
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }
  async function callService() {
    try {
      setIsLoading(true)
      const response = await fetch(`${api.URL}/authorization/login`, {
        method: "POST",
        body: JSON.stringify(formValues),
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();
      if(json.statusCode > 305) {
        setErrors(prev => ({
          ...prev,
          ['serviceError']: json.message === "There is no user registered with that email" ? "Usuario no existe" : "Email o contraseña incorrectos"
        }))
        return;
      }

      const getUserDetailsResp = await fetch(`${api.URL}/authorization/validateuser`, {
        method: "GET",
        credentials: "include"
      })
      const userDetails = await getUserDetailsResp.json();

      value.login(userDetails.data)
      navigate("/dashboard")
      console.log(value)
      
    } catch (error) {
      console.log(error)
    }

  }
  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(formValues)
    callService()
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
export default useLoginForm;