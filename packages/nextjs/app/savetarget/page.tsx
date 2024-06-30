"use client";

import React from 'react'
import bg from "../../public/homebg.png";
import Navbar from "../../components/Navbar"
import InitialSavings from '../../components/InitialSavings';
import Deposit from '../../components/Deposit';
import type { NextPage } from "next";
import AuthMiddleware from '~~/middleware/Auth';
import useProtectedRoute from '~~/hooks/auth/useProtectedRoute';

const TargetSavings: NextPage = () => {
  useProtectedRoute();
    const headerStyle = {
        backgroundImage: `url(${bg.src})`,
        /* Additional styles can be added here */
    
        // Set background size to cover the container by default
        backgroundSize: "cover",
    
        // Center the background image by default
        backgroundPosition: "center",
    
        // Media query for mobile devices
        "@media (maxWidth: 768px)": {
          backgroundSize: "auto", // Adjust background size for smaller screens
          backgroundPosition: "center", // You can adjust this as needed
        },
      };
  return (
    // <AuthMiddleware>

    <div style={headerStyle} className=' h-screen'>
        <div className=' flex justify-center items-center mt-10'>
            <Navbar />
        <InitialSavings />
        </div>
        {/* <Deposit /> */}
    </div>
  //  </AuthMiddleware>
  )
}

export default TargetSavings