import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [teacherName, setTeacherName] = useState("");

  const adminId = localStorage.getItem("userId");

  // 🔐 Protect admin route
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 📥 Fetch tutor requests (MEMOIZED)
  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/requests",
        {
          params: { adminId }
        }
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tutor requests");
    }
  }, [adminId]);

  // 🔁 Load on mount
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // 👨‍🏫 Assign teacher
  const assignTeacher = async (requestId) => {
    if (!teacherName.trim()) {
      alert("Enter teacher name");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/admin/assign-teacher/${requestId}`,
        null,
        {
          params: {
            teacherName,
            adminId
          }
        }
      );
      setTeacherName("");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to assign teacher");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          TutorBridge Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Total Requests</h2>
          <p className="text-3xl font-bold mt-2">{requests.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="text-3xl font-bold mt-2">
            {requests.filter(r => r.status === "REQUEST_SUBMITTED").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Assigned Tutors</h2>
          <p className="text-3xl font-bold mt-2">
            {requests.filter(r => r.assignedTeacher).length}
          </p>
        </div>
      </div>

      {/* Tutor Requests Table */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Tutor Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Parent</th>
                <th className="border p-2">Student</th>
                <th className="border p-2">Grade</th>
                <th className="border p-2">Subjects</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Teacher</th>
                <th className="border p-2">Assign</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-4">
                    No tutor requests found
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td className="border p-2">{req.id}</td>
                    <td className="border p-2">{req.parentName}</td>
                    <td className="border p-2">{req.studentName}</td>
                    <td className="border p-2">{req.grade}</td>
                    <td className="border p-2">{req.subjects}</td>
                    <td className="border p-2">{req.status}</td>
                    <td className="border p-2">
                      {req.assignedTeacher || "-"}
                    </td>
                    <td className="border p-2">
                      {req.status === "REQUEST_SUBMITTED" && (
                        <div className="flex gap-2 justify-center">
                          <input
                            type="text"
                            placeholder="Teacher"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            className="border px-2 py-1 rounded w-28"
                          />
                          <button
                            onClick={() => assignTeacher(req.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Assign
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
