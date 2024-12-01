import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import ProfilePatient from "../pages/private/ProfilePatient";
import PrivateRoute from "./PrivateRoute";
import PageInitialRoute from "./PageInitialRoute";
import ProfileDoctor from "../pages/private/ProfileDoctor";
import PatientAdministration from "../pages/private/PatientAdministration";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageInitialRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<ProfilePatient />} />
        </Route>
        <Route path="/doctor" element={<ProfileDoctor />} />
        <Route path="/patient/:id" element={<PatientAdministration />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
