import { createRoot } from "react-dom/client";

import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./routes/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
