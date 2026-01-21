import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch {
        return null;
      }
    })();
    if (user) navigate("/");
  }, [navigate]);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setMessage("Enter valid mobile number");
      return;
    }
    try {
      await sendOtp(phone);
      setStep(2);
      setMessage("OTP sent successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    }
  };

const handleVerifyOtp = async () => {
  if (otp.length !== 6) {
    setMessage("Enter valid OTP");
    return;
  }

  try {
    const res = await verifyOtp(phone, otp);

    // ✅ SAVE USER DATA
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("userPhone", res.data.phone);
    localStorage.setItem("role", res.data.role); // USER

    setMessage("Login successful 🎉");
    navigate("/"); // ✅ NO refresh
  } catch (error) {
    setMessage(error.response?.data?.message || "OTP verification failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-4">
          Login to TutorBridge
        </h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
