import axios from "axios";

const API_URL = "https://tutorbridge-production.up.railway.app/api/request-tutor";


export const assignTeacher = (id, teacherName) =>
  axios.put(`${API}/${id}/assign`, { teacherName });

export const startTuition = (id) =>
  axios.put(`${API}/${id}/start`);

export const completeTuition = (id) =>
  axios.put(`${API}/${id}/complete`);
