"use client";
import { useAuth } from "@/AuthContext";
import ProtectedRoute from "@/components/ProtectRoute";
import React, { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState({});
  const { profile } = useAuth();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await profile();
      setUser(userProfile.user);
      setFormData(userProfile.user);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formadat", formData);
    const res = await fetch("http://localhost:5000/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-2xl border p-4 rounded-md">
          <div className="">
            <h1 className="mb-8 text-xl font-semibold text-gray-900">
              CHANGE YOUR PROFILE
            </h1>

            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100"></div>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Change photo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={user?.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    defaultValue={user?.designation}
                    onChange={handleChange}
                    placeholder="E: Software Engineer"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
