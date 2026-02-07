import axios from "axios";

// Base backend URL from environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Tutor Request APIs
export const assignTeacher = (id, teacherName) =>
  axios.put(`${API_BASE_URL}/api/request-tutor/${id}/assign`, {
    teacherName,
  });

export const startTuition = (id) =>
  axios.put(`${API_BASE_URL}/api/request-tutor/${id}/start`);

export const completeTuition = (id) =>
  axios.put(`${API_BASE_URL}/api/request-tutor/${id}/complete`);
