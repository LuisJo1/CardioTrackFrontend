import { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useFormSpecifyInput from "./useFormSpecifyInput";
function validateField(field, value) {
  
  if(field === "names" || field === "surnames" || field === "genre" || field === "ci") {
    if(value.length < 1) return "El campo es requerido"
  }
  return ""
}
function useAddExamForm() {
  const navigate = useNavigate()
  const api = API;
  const otherPersonalBackgroundInput = useFormSpecifyInput();
  const [formValues, setFormValues] = useState({
    interventionProposed: "",
    addPersonalBackgroundDto: {
      arterialHypertension: false,
      myocardialInfarction: false,
      asthma: false,
      pneumopathy: false,
      dyslipidemia: false,
      angina: false,
      liverDisease: false,
      homeopathy: false,
      stroke: false,
      diabetesMellitus: false,
      chagas: false,
      thyroidopathy: false,
      surgery: false,
      surgeryType: "",
      obstetric: {
        gestationWeeks: 0,
        for: "",
        caesarean: false,
        stillbirth: false,
        abortion: false
      },
      medicineAllergy: false,
      allergicMedicines: [
      ],
      toxics: false,
      toxicsList: [
      ],
      otherPersonalBackground: otherPersonalBackgroundInput.entries,
      medicines: [
        
      ],
      familyBackground: false,
      familyBackgroundList: []
    },
    patientId: 0
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
    console.log(formValues)
  }, [formValues])
  useEffect(() => {
    if(Object.values(errors).every(el => el.length === 0) && submit) {
      callService()
    } else {
      setSubmit(false)
    }
  }, [errors])

  function handleOnChange(ev, onBackground, onObstetric) {
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
    if(onBackground) {
      setFormValues(prev => ({
        ...prev,
        addPersonalBackgroundDto: {
          ...prev.addPersonalBackgroundDto,
          [name]: value
        }
      }))
    } else if(onObstetric) {
      setFormValues(prev => ({
        ...prev,
        addPersonalBackgroundDto: {
          ...prev.addPersonalBackgroundDto,
          obstetric: {
            ...prev.addPersonalBackgroundDto.obstetric,
            [name]: value
          }
        }
      }))
    }
       else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  function handleOnChangeOnSelection(value) {
    setFormValues(prev => ({
      ...prev,
      addPersonalBackgroundDto: {
        ...prev.addPersonalBackgroundDto,
        [value]: !prev.addPersonalBackgroundDto[value]
      }
    }));
    console.log(value);
  }
  async function callService() {
    try {
      setIsLoading(true)
      const response = await fetch(`${api.URL}/exam/addExam`, {
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
      setSuccess(true);
      console.log(json)
      Swal.fire({
        title: "¡Examen añadido exitosamente!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
          navigate(`/dashboard`)
      }).catch(err => {
        console.log(err)
        navigate(`/dashboard`)
      })
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        ["serviceError"]: error
      }))
      setSubmit(false);
      setIsLoading(false);
      setSuccess(false)
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
  function changeObstetricType(name, value) {
    setFormValues(prev => ({
      ...prev,
      addPersonalBackgroundDto: {
        ...prev.addPersonalBackgroundDto,
        obstetric: {
          ...prev.addPersonalBackgroundDto.obstetric,
          abortion: false,
          caesarean: false,
          stillbirth: false,
          [name]: value,
        }
      }
    }))
  }
  
  return {
    formValues,
    isLoading,
    success,
    submit,
    errors,
    handleOnChange,
    handleSubmit,
    changeObstetricType,
    handleOnChangeOnSelection
  }
}
export default useAddExamForm;