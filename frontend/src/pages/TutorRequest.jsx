import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TutorRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "",
    grade: "",
    board: "CBSE",
    subjects: "",
    city: "",
    area: "",
    mode: "Home Tutor",
    timePreference: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FIX: handleChange was missing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    try {
      const res = await fetch(`${API_BASE_URL}/api/request-tutor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Request submitted successfully!");
        navigate("/");
      } else {
        const text = await res.text();
        console.error("Submit failed:", text);
        alert("Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Backend unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Tutor Request Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Parent Name</label>
          <input
            name="parentName"
            required
            value={form.parentName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-medium">Email (optional)</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Student Name</label>
            <input
              name="studentName"
              required
              value={form.studentName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-medium">Class / Grade</label>
            <input
              name="grade"
              required
              value={form.grade}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Board</label>
          <select
            name="board"
            value={form.board}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>CBSE</option>
            <option>ICSE</option>
            <option>State Board</option>
            <option>IB</option>
            <option>IGCSE</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Subjects</label>
          <input
            name="subjects"
            required
            value={form.subjects}
            onChange={handleChange}
            placeholder="Maths, Science"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">City</label>
            <input
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-medium">Area / Locality</label>
            <input
              name="area"
              required
              value={form.area}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>Home Tutor</option>
            <option>Online Tutor</option>
            <option>Both</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Preferred Time</label>
          <input
            name="timePreference"
            value={form.timePreference}
            onChange={handleChange}
            placeholder="Evening, Morning etc."
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <textarea
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
