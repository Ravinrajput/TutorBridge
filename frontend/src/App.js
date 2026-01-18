import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TutorRequest from "./pages/TutorRequest";
import AdminDashboard from "./pages/AdminDashboard";
import MyRequests from "./pages/MyRequests";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/request-tutor" element={<TutorRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
