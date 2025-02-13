import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../routes/AuthContext";
import { Roles } from "../../api";
import ProfileDoctor from "./ProfileDoctor";
import ProfilePatient from "./ProfilePatient";
import Login from "../public/Login";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [userRol, setUserRol] = useState(null);
  useEffect(() => {
    const userRol = authContext.user?.rolId;
    if (userRol) {
      setUserRol(Number(userRol));
    }
  }, [authContext]);
  if (userRol === null) <Login />;
  if (userRol === Roles.DOCTOR) return <ProfileDoctor />;
  if (userRol === Roles.PATIENT) return <ProfilePatient />;
  if (userRol === Roles.ADMIN) return <Navigate to={"/admin"}/>
};
export default Dashboard;
