'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { useScaffoldReadContract, useScaffoldWriteContract } from "../hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import Deposit from "./Deposit"
const HistoryCard = ({id}) => {

  const { address } = useAccount()
  const [historyData, setHistoryData] = useState(null)

  const { data: fetchData } = useScaffoldReadContract({
    contractName: "Esusu",
    functionName: "getSavings",
    args: [id, address]
});


const { writeContractAsync, isPending } = useScaffoldWriteContract("Esusu")


const handleWithdraw = async () => {
  try {
    await writeContractAsync({
      functionName: "targetReach",
        args: [id],
    })
  } catch (error) {
    console.log(error)
  }
}
console.log(id, "id")

console.log(fetchData)

const getSavings = useCallback(() => {
  if (!fetchData) return null;

  setHistoryData({
    owner: fetchData[0],
    savingsAmount: fetchData[1],
    target: Number(fetchData[2]),
    purpose: fetchData[3],
    isInitiated: Boolean(fetchData[4]),
    forceWithdraw: fetchData[5],
    inSaving: Boolean(fetchData[6]),
    SavingsStatus: fetchData[9],
    // nonce: Number(fetchData[10]),
  })
}, [fetchData]);

useEffect(() => {
  getSavings()
}, [getSavings])

const currentAmount = historyData?.savingsAmount ? formatEther(historyData?.savingsAmount.toString()) : 0;
const target = historyData?.target ? formatEther(historyData?.target.toString()) : 0;
let timeStampNs = historyData?.isTime

  let timeStampS = timeStampNs / 1e9;

  let date = new Date(timeStampS * 1000)

  let readableDate = date.toLocaleString()
  console.log("Readable date", readableDate)

  console.log(historyData?.isTime)




console.log(historyData?.SavingsStatus)
if (!historyData) return null;

if (address !== historyData?.owner) return null;

  return (
    <>
    {address == historyData?.owner ? <>

    <div className=' flex items-center justify-center flex-grow basis-[100px] mt-10'>
        <div className="rounded-[22px] w-[23rem] p-4 sm:p-10 bg-white dark:bg-zinc-900 m-3">
            <Address address={historyData?.owner} />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Current Amount: {currentAmount} XRP
          </p>
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Purpose: {historyData?.purpose}
          </p>
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Target: {target} XRP
          </p>
          
          <div>
            { target < currentAmount ? <>
            <p>You have reach your target</p>
            <button onClick={handleWithdraw} className="mt-4 text-sm text-white bg-black rounded-full px-3 py-1">Withdraw</button>
            </> : <>
              <p>You have not reach your target</p>
            <Deposit id={id} />
            
            </>}
          </div>
        </div>
    </div>
    </> : <div>
      {/* <p>You dont have not initail Savings. Visit <Link href={"/savetarget"}>Initial Savings</Link></p> */}
      </div>}
    </>
  )
}

export default HistoryCard
