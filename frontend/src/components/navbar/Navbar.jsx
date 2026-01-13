import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Safe parse for localStorage user
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="font-bold text-xl">TutorBridge</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/request-tutor" className="hover:text-blue-600">Request Tutor</Link>

          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.phone}</span>
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
