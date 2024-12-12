import { useState } from "react";
import { API } from "../api";

function usePatchPatientProfilePic() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  async function patchPatientProfilePic(body) {
    try {
      setIsLoading(true);
      setSuccess(false);
      const data = new FormData();

      data.append("file", body.file);
      data.append("patientId", body.patientId);
      const serviceResp = await fetch(`${API.URL}/patient/patchpatientprofilephoto`, {
        method: "PATCH",
        credentials: "include",
        body: data,
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
    patchPatientProfilePic
  }
}
export default usePatchPatientProfilePic;