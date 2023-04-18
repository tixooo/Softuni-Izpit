import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AuthProvider from "./components/AuthProvider";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateInventory from "./components/CreateInventory";
import Unauthorized from "./components/Unauthorized";
import AdminRole from "./components/AdminRole";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createInventory" element={<CreateInventory />} />
          </Route>
          <Route path="/" element={<AdminRole />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
