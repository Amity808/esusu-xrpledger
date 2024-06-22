'use client'
import React, { useState, useEffect } from 'react'
import { useScaffoldReadContract } from "../hooks/scaffold-eth"
import HistoryCard from './HistoryCard'

const AllTxHistory = () => {

    const { data: savingsLength } = useScaffoldReadContract({
        contractName: "Esusu",
        functionName: "savinsLen",
        args: []
    });

    const saveLen = savingsLength ? Number(savingsLength.toString()) : 0;

    console.log(saveLen)
    const getAllHistoryInitalSavings = () => {
        if(!savingsLength) return null;
        const deposit = [];
        for (let i = 0; i < saveLen; i++) {
            deposit.push(<HistoryCard id={i} key={i} />)
        }
        return deposit
    }
  return (
    <div>
        <div>
      <h2 style={{ padding: '30px', color: '#333333', textAlign: 'center', marginBottom: '40px' }}>Check all your deposit history </h2>
                <div className="courses" style={{ display: "grid", gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {getAllHistoryInitalSavings()}
                </div>
      </div>
    </div>
  )
}

export default AllTxHistory

// import React, { useState, useEffect } from 'react';
// import { useScaffoldReadContract } from "../hooks/scaffold-eth";
// import HistoryCard from './HistoryCard';

// const AllTxHistory = () => {
//     const { data: savingsLength } = useScaffoldReadContract({
//         contractName: "Esusu",
//         functionName: "savinsLen",
//         args: []
//     });

//     // const saveLen = savingsLength ? Number(savingsLength.toString()) : 0;
//     // const [validHistoryIds, setValidHistoryIds] = useState([]);

//     // useEffect(() => {
//     //     const getAllHistoryInitalSavings = async () => {
//     //         if (!savingsLength) return;

//     //         const ids = [];
//     //         for (let i = 0; i < saveLen; i++) {
//     //             ids.push(i);
//     //         }
//     //         setValidHistoryIds(ids);
//     //     };

//     //     getAllHistoryInitalSavings();
//     // }, [savingsLength, saveLen]);

//     const saveLen = savingsLength ? Number(savingsLength.toString()) : 0;

//     console.log(saveLen)
//     const getAllHistoryInitalSavings = () => {
//         if(!savingsLength) return null;
//         const deposit = [];
//         for (let i = 0; i < saveLen; i++) {
//             deposit.push(<HistoryCard id={i} />)
//         }
//         return deposit
//     }

//     return (
//         <div>
//             <h2 style={{ padding: '30px', color: '#333333', textAlign: 'center', marginBottom: '40px' }}>
//                 Check all your deposit history
//             </h2>
           
//             <div className=" mx-auto max-w-4xl py-2 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-3">
//         <div className="flex gap-1 flex-wrap w-full">
//         {/* {validHistoryIds.map(id => (
//                     <HistoryCard key={id} id={id} />
//                 ))} */}
//                 {getAllHistoryInitalSavings()}
//         </div>
//       </div>
//         </div>
//     );
// };

// export default AllTxHistory;

