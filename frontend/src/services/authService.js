import axios from "axios";

// Use localhost when testing locally
const API_URL = "http://localhost:8080/api/auth";

export const sendOtp = (phone) =>
  axios.post(`${API_URL}/send-otp`, { phone });

export const verifyOtp = (phone, otp) =>
  axios.post(`${API_URL}/verify-otp`, { phone, otp });
