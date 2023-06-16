import React from 'react'
import { useRecoilValue } from 'recoil'
import { atomData, atomSavings } from '../../const data/data'
import Protected from '../../utils/Protected'
export default function YourData() {
    const data = useRecoilValue(atomData)
    let savings = useRecoilValue(atomSavings)
 
 
    let inc = 0
    let exp = 0
    for (let i = 0; i < data.length; i++){
      if (data[i].type == 'Expense') {
        exp = exp + Number(data[i].amount);
      }
      else {
        inc = inc + Number(data[i].amount);
       
      }
    }
  return (
    <>
      <Protected/>
      <div>
          <h2>Current Savings: ₹{(savings - exp)}</h2>
          <h2>Total Expense: ₹{exp}</h2>
          <h2>Total Income: ₹{inc}</h2>
      </div>
      </>
  )
}
