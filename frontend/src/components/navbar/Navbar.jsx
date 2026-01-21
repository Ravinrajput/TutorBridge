import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ Read from localStorage
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role"); // ADMIN / USER
  const phone = localStorage.getItem("userPhone");
  const email = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear(); // ✅ clears old ADMIN role issue
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="font-bold text-xl">TutorBridge</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>

          {/* ✅ ADMIN ONLY */}
          {role === "ADMIN" && (
            <Link to="/admin-dashboard" className="hover:text-blue-600">
              Admin Dashboard
            </Link>
          )}

          {/* ✅ LOGGED IN USER */}
          {userId ? (
            <>
              <span className="text-gray-700">
                Hi, {role === "ADMIN" ? email : phone}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/signup" className="hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
