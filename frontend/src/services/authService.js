import axios from "axios";

const API_URL = "https://tutorbridge-production.up.railway.app/api/auth";

export const sendOtp = (phone) =>
  axios.post(`${API_URL}/send-otp`, { phone });

export const verifyOtp = (phone, otp) =>
  axios.post(`${API_URL}/verify-otp`, { phone, otp });
