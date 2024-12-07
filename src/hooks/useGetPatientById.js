import { useState } from "react";
import { API } from "../api";

function useGetPatientById() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  async function getPatientById(patientId) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(`${API.URL}/patient/getpatient?patientId=${patientId}`, {
        method: "GET",
        credentials: "include"
      });
  
      const json = await serviceResp.json();
      setData(json.data)
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
    getPatientById
  }
}
export default useGetPatientById;