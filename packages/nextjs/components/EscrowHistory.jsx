import React, { useState } from "react";
import {useAuth} from "~~/context/AuthContext"
export default function EscrowHistory() {
  // Client
  const { createEscrow, cancelEscrow, finishEscrow } = useAuth()
  const [sequence, setSequence] = useState('')

  const finishEscrowStatus = async() => {
    try {
        const result = await finishEscrow(sequence)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }
  const cancelEscrowS = async() => {
    try {
        const result = await cancelEscrow(sequence)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
        <h2>Escrow History</h2>

        <div>

        </div>
    </div>
  );
}
