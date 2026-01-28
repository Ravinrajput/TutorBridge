import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const phone = localStorage.getItem("userPhone"); // saved after OTP login

  useEffect(() => {
    if (!phone) return;

    axios
      .get(`https://tutorbridge-production.up.railway.app/api/request-tutor/my-requests?phone=${phone}`)
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to load requests"));
  }, [phone]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Tutor Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Subjects</th>
              <th>Status</th>
              <th>Teacher</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.studentName}</td>
                <td>{r.subjects}</td>
                <td>{r.status}</td>
                <td>{r.assignedTeacher || "-"}</td>
                <td>{r.createdAt?.replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequests;
