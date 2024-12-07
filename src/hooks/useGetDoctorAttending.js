import { useState } from "react";
import { API } from "../api";

function useGetDoctorAttending() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  function convertFilters(filters) {
    let resultString = "";
    let index = 0;
    Object.entries(filters).forEach(filter => {
      if(index === 0) {
        resultString += `?${filter[0]}=${filter[1]}`;
      } else [
        resultString += `&${filter[0]}=${filter[1]}`
      ]
      index++;
    })
    return resultString;
  }
  async function getDoctorAttending(filters) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(`${API.URL}/patient/getDoctorAttending${convertFilters(filters)}`, {
        method: "GET",
        credentials: "include"
      });
  
      const json = await serviceResp.json();
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
    getDoctorAttending
  }
}
export default useGetDoctorAttending;