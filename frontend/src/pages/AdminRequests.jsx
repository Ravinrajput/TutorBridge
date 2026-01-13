import React, { useEffect, useState } from "react";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/request-tutor")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch requests:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Tutor Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Parent Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Board</th>
              <th className="border px-4 py-2">Subjects</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Area</th>
              <th className="border px-4 py-2">Mode</th>
              <th className="border px-4 py-2">Time Preference</th>
              <th className="border px-4 py-2">Notes</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td className="border px-4 py-2">{req.id}</td>
                <td className="border px-4 py-2">{req.parentName}</td>
                <td className="border px-4 py-2">{req.phone}</td>
                <td className="border px-4 py-2">{req.email}</td>
                <td className="border px-4 py-2">{req.studentName}</td>
                <td className="border px-4 py-2">{req.grade}</td>
                <td className="border px-4 py-2">{req.board}</td>
                <td className="border px-4 py-2">{req.subjects}</td>
                <td className="border px-4 py-2">{req.city}</td>
                <td className="border px-4 py-2">{req.area}</td>
                <td className="border px-4 py-2">{req.mode}</td>
                <td className="border px-4 py-2">{req.timePreference}</td>
                <td className="border px-4 py-2">{req.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
