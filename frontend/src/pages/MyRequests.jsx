import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const phone = localStorage.getItem("userPhone"); // saved after OTP login
  const API = process.env.REACT_APP_API_BASE_URL; // use env variable

  useEffect(() => {
    if (!phone) {
      setError("No phone number found. Please login.");
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API}/api/request-tutor/my-requests`, {
          params: { phone }
        });
        setRequests(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [phone, API]);

  if (loading) return <p className="p-6 text-center">Loading requests...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tutor Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Student</th>
                <th className="border p-2">Subjects</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Teacher</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="border p-2">{r.id}</td>
                  <td className="border p-2">{r.studentName}</td>
                  <td className="border p-2">{r.subjects}</td>
                  <td className="border p-2">{r.status}</td>
                  <td className="border p-2">{r.assignedTeacher || "-"}</td>
                  <td className="border p-2">
                    {r.createdAt ? r.createdAt.replace("T", " ") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;