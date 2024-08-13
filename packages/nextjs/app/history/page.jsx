"use client"
import React from 'react'
import bg from "../../public/homebg.png";
// import Navbar from "../../components/Navbar"
// // import Trasactionhistory from "../../components/Trasactionhistory"
// import HistoryCard from '../../components/HistoryCard';
import AllTxHistory from '../../components/AllTxHistory';
import AuthMiddleware from '~~/middleware/Auth';
import useProtectedRoute from '~~/hooks/auth/useProtectedRoute';
import {useAuth} from "~~/context/AuthContext"
import EscrowHistory from '~~/components/EscrowHistory';

const History = () => {
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
    <AuthMiddleware>

    <div style={headerStyle} className=' h-screen'>
        
       <div>
       <AllTxHistory />

       </div>
       <h3>Escrow Status</h3>
    <EscrowHistory />
    </div>
    </AuthMiddleware>
  )
}

export default History