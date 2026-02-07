import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auth`;

export const sendOtp = (phone) =>
  axios.post(`${API_URL}/send-otp`, { phone });

export const verifyOtp = (phone, otp) =>
  axios.post(`${API_URL}/verify-otp`, { phone, otp });
