import { useContext, useState } from "react"
import { API } from "../api"
import { AuthContext } from "../routes/AuthContext";

function useLogout () {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  async function logout() {
    try {
      setLoading(true)
      const resp = await fetch(`${API.URL}/authorization/logout`, {
        method: "POST",
        credentials: "include"
      })
      console.log(resp);
      setSuccess(true)
      setLoading(false);
      authContext.logout();
      window.location.reload()
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setLoading(false);
    }
  }
  return {
    loading,
    success,
    logout
  }
}
export default useLogout;