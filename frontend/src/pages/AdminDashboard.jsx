import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:8080/api/request-tutor");
    setRequests(res.data);
  };

  const assignTeacher = async (id) => {
    if (!teacherName) {
      alert("Enter teacher name");
      return;
    }

    await axios.put(
      `http://localhost:8080/api/request-tutor/${id}/assign`,
      null,
      { params: { teacherName } }
    );

    setTeacherName("");
    fetchRequests();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin – Tutor Requests</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Assign Teacher</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.studentName}</td>
              <td className="border p-2">{r.phone}</td>
              <td className="border p-2">{r.status}</td>

              <td className="border p-2">
                {r.status === "REQUEST_SUBMITTED" && (
                  <>
                    <input
                      type="text"
                      placeholder="Teacher name"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      className="border px-2 py-1 mr-2"
                    />
                    <button
                      onClick={() => assignTeacher(r.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Assign
                    </button>
                  </>
                )}

                {r.status !== "REQUEST_SUBMITTED" && r.assignedTeacher}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
