import axios from "axios";

const API_URL = "http://localhost:8080/api/request-tutor";

// Assign a teacher to a request
export const assignTeacher = (id, teacherName) =>
  axios.put(`${API_URL}/${id}/assign`, { teacherName });

// Start a tuition session
export const startTuition = (id) =>
  axios.put(`${API_URL}/${id}/start`);

// Complete a tuition session
export const completeTuition = (id) =>
  axios.put(`${API_URL}/${id}/complete`);
