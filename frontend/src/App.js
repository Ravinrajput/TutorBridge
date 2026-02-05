import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminVerifyOtp from "./pages/AdminVerifyOtp";
import AdminDashboard from "./pages/AdminDashboard";
import TutorRequest from "./pages/TutorRequest";
import MyRequests from "./pages/MyRequests";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? children : <Navigate to="/admin-login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* OTP page MUST stay public */}
        <Route path="/admin-verify-otp" element={<AdminVerifyOtp />} />

        {/* Tutor */}
        <Route path="/request-tutor" element={<TutorRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* Protected Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
