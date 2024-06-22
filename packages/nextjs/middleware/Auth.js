"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Preloader from "../components/Preloader"
import useWeb3Auth from "../hooks/auth/useWeb3Auth";

const AuthMiddleware = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
      let token;

      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    
        if (!token) {
            router.push("/login");
        }
    }


  }, [router])

  


//   if (isLoading) return <> <Preloader /></>;

//   if (token) return <>{children}</>;

//   if (!token) {
//     router.push("/login");
//   }


  return  <> {children}</>;
};

export default AuthMiddleware;