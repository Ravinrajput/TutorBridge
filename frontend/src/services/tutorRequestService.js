import axios from "axios";

const API = "http://localhost:8080/api/request-tutor";

export const assignTeacher = (id, teacherName) =>
  axios.put(`${API}/${id}/assign`, { teacherName });

export const startTuition = (id) =>
  axios.put(`${API}/${id}/start`);

export const completeTuition = (id) =>
  axios.put(`${API}/${id}/complete`);
