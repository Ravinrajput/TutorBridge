import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TutorRequest from "./pages/TutorRequest";
import MyRequests from "./pages/MyRequests";

function App() {
  const isAdmin = localStorage.getItem("role") === "ADMIN";

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
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
