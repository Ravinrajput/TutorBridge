import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TutorRequest from "./pages/TutorRequest";
import MyRequests from "./pages/MyRequests";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/request-tutor" element={<TutorRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* ✅ ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin-dashboard"
          element={role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
