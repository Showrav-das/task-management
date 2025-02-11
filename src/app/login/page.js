"use client";

import { useAuth } from "@/AuthContext";
import { setToken } from "@/libs/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      await login(formData);
      router.push("/profile");
    } catch (error) {
      // setError(error.message);
      console.log("first", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Log In</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-700 text-sm">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-base transition-colors duration-200"
            >
              Sign in
            </button>
          </form>
          <p className="text-base text-gray-600 text-center">
            If you do not have an account? Go to{" "}
            <Link href="/register" className="text-purple-600 hover:underline">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
