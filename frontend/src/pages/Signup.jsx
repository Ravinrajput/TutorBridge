import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-24">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Signup is OTP-based</h2>
        <p className="text-gray-700 mb-4">
          Just enter your phone number in the login page. If it's new, you will be automatically registered.
        </p>
        <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
      </div>
    </div>
  );
}
