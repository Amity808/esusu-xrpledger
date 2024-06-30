"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "../components/Preloader";
import useWeb3Auth from "../hooks/auth/useWeb3Auth";
import { useAuth } from "~~/context/AuthContext";

const AuthMiddleware = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated === null) return; // Don't do anything if still checking auth state
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  //   if (isLoading) return <> <Preloader /></>;

  //   if (token) return <>{children}</>;

  //   if (!token) {
  //     router.push("/login");
  //   }

  return <> {children}</>;
};

export default AuthMiddleware;
