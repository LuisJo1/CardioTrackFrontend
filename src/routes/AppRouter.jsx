import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import Profile from "../pages/private/Profile";
import PrivateRoute from "./PrivateRoute";
import PageInitialRoute from "./PageInitialRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageInitialRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              {" "}
              <Profile />{" "}
            </PrivateRoute>
          }
        />
      </Routes>{" "}
    </BrowserRouter>
  );
};

export default AppRouter;
