import axios from "axios";



const API_URL = "https://tutorbridge-production.up.railway.app/api/auth";


export const sendOtp = async (phone) => {
  return axios.post(`${API_URL}/send-otp`, { phone });
};

export const verifyOtp = async (phone, otp) => {
  return axios.post(`${API_URL}/verify-otp`, { phone, otp });
};
