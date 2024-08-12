'use client'

import React , { useState } from "react";
import { Client, xrpToDrops } from "xrpl";
import {useAuth} from "~~/context/AuthContext"
import CustomInput from "./ui/CustomeInput";
import AuthMiddleware from '~~/middleware/Auth';
import useProtectedRoute from '~~/hooks/auth/useProtectedRoute';

const CreateEscrow = () => {
  useProtectedRoute();
  const client = new Client("wss://s.devnet.rippletest.net:51233");
//   await client.connect()
const { createEscrow } = useAuth()

 const [amount, setAmount] = useState('')
 const [startEscrow, setStartEscrow] = useState('10')
 const [endEscrow, setEndEscrow] = useState('100')
 const [Destination, setDestination] = useState('')
  const addSeconds = (numOfSeconds, date = new Date()) => {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    date = Math.floor(date / 1000);
    date = date - 946684800;
    return date;
  };

  // const addCreatescrow = async () => {
  //   let escrow_finish_date = new Date();
  //   let escrow_cancel_date = new Date();
  //   escrow_finish_date = addSeconds(parseInt(startEscrow));
  //   escrow_cancel_date = addSeconds(parseInt(endEscrow));
  //   console.log(escrow_finish_date);

  //   const escrowTx = await client.autofill({
  //     "TransactionType": "EscrowCreate",
  //     "Account": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", //correct with good address
  //     "Amount": xrpToDrops(amount),
  //     "Destination": "",
  //     "FinishAfter": escrow_finish_date,
  //     "CancelAfter": escrow_cancel_date
  //   })

  //   // const signed = 
  // };

  const initalEscrow = async (e) => {
    e.preventDefult();
    let escrow_finish_date = new Date();
    let escrow_cancel_date = new Date();
    escrow_finish_date = addSeconds(parseInt(startEscrow));
    escrow_cancel_date = addSeconds(parseInt(endEscrow));
    console.log(escrow_finish_date);
    try {
      const result = await createEscrow(Destination, escrow_finish_date, amount)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AuthMiddleware>

    <div className=" flex justify-center items-center flex-col my-[100px]">

    <div>
      Create your escrow payment
    </div>

 
    <form className="items-center flex flex-col mt-[20px] justify-center">
      <div>
      <CustomInput 
            className=" w-[400px] text-black"
              placeholder="Amount"
              onChange={(e) => setEndEscrow(e.target.value)}
              type="number"
            
            />
      </div>
      <div>
      <CustomInput 
            className=" w-[400px] text-black"
              placeholder="Amount"
              onChange={(e) => setDestination(e.target.value)}
              type="number"
            
            />
      </div>
      <div>
      <CustomInput 
            className=" w-[400px] text-black"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            
            />
      </div>

  
  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={initalEscrow}>Create Escrow</button>
    </form>
  </div>
    </AuthMiddleware>
  )
};

export default CreateEscrow;
