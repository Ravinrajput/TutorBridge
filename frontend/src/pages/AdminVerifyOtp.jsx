import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminVerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const phone = localStorage.getItem("adminPhone");

 const verifyOtp = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp: otp.trim() }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("role", "ADMIN");
    localStorage.removeItem("adminPhone");

    setMessage("Login successful 🎉");

    setTimeout(() => navigate("/admin-dashboard"), 800);

  } catch (err) {
    console.error(err);
    setMessage("Invalid or expired OTP ❌");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4 text-center">Verify OTP</h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Verify
        </button>

        {message && (
          <p className="text-center text-sm mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
