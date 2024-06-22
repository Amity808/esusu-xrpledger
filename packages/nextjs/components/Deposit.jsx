"use client";

import React, { useState } from "react";
import { useScaffoldWriteContract } from "../hooks/scaffold-eth";
import CustomInput from "./ui/CustomeInput";
import { toast } from "react-toastify";
import { parseEther } from "viem";
import { useAccount } from "wagmi";


const Deposit = ({ id }) => {
const [Amount, setAmount] = useState("");
const { address } = useAccount()

const { writeContractAsync, isPending } = useScaffoldWriteContract("Esusu");

  const handleClear = () => {
    setAmount("");
  };


  console.log(id)
 

  const initialSave = async (e) => {
    e.preventDefault();
    try {
      await writeContractAsync({
        functionName: "depositSave",
        args: [id],
        value: parseEther(Amount),
      });
      handleClear();
    } catch (error) {
      handleClear();
      console.log(error);
    }
  };
  return (
    <>
      {/* Dialogo */}
      <button className="btn" onClick={() => document.getElementById("my_modal_5").showModal()}>
        Deposit
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Deposit</h3>
          <div className="modal-action flex justify-center items-center">
            <form method="dialog">

              <div>
                <CustomInput
                  onChange={e => setAmount(e.target.value)}
                  className=" w-[400px]"
                  placeholders="amount"
                  type="number"
                />
              </div>
              <div></div>
              <button
                className="text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]"
                onClick={initialSave}
                disabled={isPending}
                type="submit"
              >
                Save
              </button>
              <button className=" ml-4 text-white p-4 bg-blue-500/60 rounded-lg text-lg font-bold w-[100px]">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Deposit;
