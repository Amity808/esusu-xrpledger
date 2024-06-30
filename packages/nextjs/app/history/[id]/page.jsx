"use client"
import React from 'react'
import useProtectedRoute from '~~/hooks/auth/useProtectedRoute';

const Deatails = () => {
  useProtectedRoute();
  return (
    <div>
      Details
    </div>
  )
}

export default Deatails
