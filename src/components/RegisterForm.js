"use client";

import { useAuth } from "@/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ValidateForm(formData, setErrors)) {
      return;
    }

    try {
      await register(name, email, password);

      router.push("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Sign up</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full p-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                onChange={handleChange}
                id="username"
                type="text"
                name="username"
                placeholder="Write your name"
                className={`w-full p-3 rounded-lg border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  // required
                  className={`w-full p-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  id="confirmpassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  // required
                  className={`w-full p-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* {error && <p className="text-red-500">{error}</p>} */}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-base transition-colors duration-200"
            >
              Sign up
            </button>
          </form>
          <p className="text-base text-gray-600 text-center">
            Have already an account? Go to{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
