'use client'

import React , { useState } from "react";
import { Client } from "xrpl";

const CreateEscrow = () => {
  const client = new Client("wss://s.devnet.rippletest.net:51233");
//   await client.connect()
 const [amount, setAmount] = useState('')
 const [startEscrow, setStartEscrow] = useState('10')
 const [endEscrow, setEndEscrow] = useState('100')
  const addSeconds = (numOfSeconds, date = new Date()) => {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    date = Math.floor(date / 1000);
    date = date - 946684800;
    return date;
  };

  const addCreatescrow = async () => {
    let escrow_finish_date = new Date();
    let escrow_cancel_date = new Date();
    escrow_finish_date = addSeconds(parseInt(startEscrow));
    escrow_cancel_date = addSeconds(parseInt(endEscrow));
    console.log(escrow_finish_date);

    const escrowTx = await client.autofill({
      "TransactionType": "EscrowCreate",
      "Account": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", //correct with good address
      "Amount": amount,
      "Destination": "",
      "FinishAfter": escrow_finish_date,
      "CancelAfter": escrow_cancel_date
    })

    // const signed = 
  };
  return <div>CreateEscrow

    <button onClick={addCreatescrow}>Create</button>
  </div>;
};

export default CreateEscrow;
