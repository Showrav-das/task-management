"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? <>{children}</> : null;
}
