import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import PrivateRoute from "./PrivateRoute";
import PageInitialRoute from "./PageInitialRoute";
import ProfileDoctor from "../pages/private/ProfileDoctor";
import PatientAdministration from "../pages/private/PatientAdministration";
import Dashboard from "../pages/private/Dashboard";
import { Roles } from "../api";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageInitialRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute rol={null} />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/doctor" element={<ProfileDoctor />} />
        <Route
          path="/patient/:id"
          element={<PrivateRoute rol={Roles.DOCTOR} />}
        >
          <Route index element={<PatientAdministration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
