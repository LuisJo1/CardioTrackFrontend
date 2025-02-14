import { useState } from "react";
import { API } from "../api";

function useGetPatientsWithFilters() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataDoctor, setDataDoctor] = useState(null);
  const [success, setSuccess] = useState(false);

  function convertFilters(filters) {
    let resultString = "";
    let index = 0;
    Object.entries(filters).forEach((filter) => {
      if (index === 0) {
        resultString += `?${filter[0]}=${filter[1]}`;
      } else [(resultString += `&${filter[0]}=${filter[1]}`)];
      index++;
    });
    return resultString;
  }

  async function getPatientsWithFilters(filters, accumulate) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(
        `${API.URL}/patient/getpatientwithfilters${convertFilters(filters)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await serviceResp.json();
      if (accumulate) {
        setData((prev) => ({
          count: json.data.count,
          results: [...prev["results"], ...json.data.results],
        }));
      } else {
        setData(json.data);
      }
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setData(null);
      setSuccess(false);
    }
  }

  async function getDoctorsWithFilters(filters, accumulate) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(
        `${API.URL}/doctor/getdoctorpatientswithfilters${convertFilters(
          filters
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await serviceResp.json();
      if (accumulate) {
        setDataDoctor((prev) => ({
          count: json.data.count,
          results: [...prev["results"], ...json.data.results],
        }));
      } else {
        setDataDoctor(json.data);
      }
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setDataDoctor(null);
      setSuccess(false);
    }
  }

  async function deletePatient(id) {
    console.log(id);

    try {
      setIsLoading(true);
      setSuccess(false);
      const serviceResp = await fetch(
        `${API.URL}/patient/deletepatient?patientId=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!serviceResp.ok) {
        // Verifica errores HTTP (status fuera de 200-299)
        const errorData = await serviceResp.json(); // Intenta parsear la respuesta de error
        throw new Error(
          errorData.message || `Error HTTP! status: ${serviceResp.status}`
        ); // Lanza un error
      }

      const json = await serviceResp.json();
      setSuccess(true);
      console.log("Respuesta:", json);
      getPatientsWithFilters()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    data,
    success,
    getPatientsWithFilters,
    getDoctorsWithFilters,
    deletePatient,
  };
}
export default useGetPatientsWithFilters;
