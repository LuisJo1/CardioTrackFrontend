import { useState } from "react";
import { API } from "../api";

function useAddDoctorPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  async function addDoctorPatient(patientId) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(`${API.URL}/doctor/addPatientToDoctorList?patientId=${patientId}`, {
        method: "POST",
        credentials: "include"
      });
  
      const json = await serviceResp.json();
      console.log(json);
      setData(json.data);
      setSuccess(true);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setData(null);
      setSuccess(false);
    }
  }
  return {
    isLoading,
    data,
    success,
    addDoctorPatient
  }
}
export default useAddDoctorPatient;