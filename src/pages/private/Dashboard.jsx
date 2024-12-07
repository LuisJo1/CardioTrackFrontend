import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../routes/AuthContext";
import { Roles } from "../../api";
import ProfileDoctor from "./ProfileDoctor";
import ProfilePatient from "./ProfilePatient";
const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [userRol, setUserRol] = useState(null);
  useEffect(() => {
    const userRol = authContext.user?.rolId;
    if (userRol) {
      setUserRol(Number(userRol));
    }
  }, [authContext]);
  if (userRol === null) return <>unauthorized</>;
  if (userRol === Roles.DOCTOR) return <ProfileDoctor />;
  if (userRol === Roles.PATIENT) return <ProfilePatient />;
};
export default Dashboard;
