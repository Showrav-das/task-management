"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      console.log("Passwords do not match!");
      return;
    }
    const res = await fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, email }),
    });
    // Handle password reset logic here
    console.log("Password reset requested for:", res);
  };
  return (
    <div className="min-h-screen overflow-y-hidden bg-[#F7F9FA] flex flex-col items-center py-8">
      <div className="w-full max-w-lg px-4 mt-10">
        <h2 className="text-gray-600 text-center text-2xl font-semibold mb-3">
          Forgot Password
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* pass */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700 text-sm">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              {/* confirm pass */}
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700 text-sm">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10"
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error} </p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-base transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
