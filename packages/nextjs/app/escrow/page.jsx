import React from 'react'
import CreateEscrow from "~~/components/CreateEscrow"
import bg from "~~/public/homebg.png"
const Escrow = () => {
  
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
    <div className={` h-screen`} style={headerStyle}>
      <CreateEscrow />
    </div>
  )
}

export default Escrow
