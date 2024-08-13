import React, { useState } from "react";
import { useAuth } from "~~/context/AuthContext";

export default function EscrowHistory() {
  // Client
  const { createEscrow, cancelEscrow, finishEscrow } = useAuth();
  const [sequence, setSequence] = useState("");
  const [fininshSequence, setFininshSequence] = useState("");

  const finishEscrowStatus = async () => {
    try {
      const result = await finishEscrow(fininshSequence);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelEscrowS = async () => {
    try {
      const result = await cancelEscrow(sequence);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Escrow History</h2>

      <div>
        <div>
          <h2>Input your escrow sequence to check your escrow status</h2>
          <input type="text" placeholder="Finish Escrow" onChange={() => setFininshSequence(e.target.value)} className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
          <h2>Input your escrow sequence to cancel your escrow</h2>
          <input type="text" placeholder="Cancel Escrow" onChange={() => setSequence(e.target.value)} className="input input-bordered w-full max-w-xs" />
        </div>
      </div>
    </div>
  );
}
