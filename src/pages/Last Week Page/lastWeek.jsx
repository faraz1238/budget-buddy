import { useRecoilState } from 'recoil'
import { useState } from 'react';
import { atomData } from '../../const data/data'
import Protected from '../../utils/Protected';
import styles from './lastWeek.module.css'

export function LastWeek() {
  const [data, setData] = useRecoilState(atomData)
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7))
    const lastWeekData = data.filter((obj) => {
        const objDate = (new Date(obj.date));
        return objDate >= oneWeekAgo;
    });
  let inc = 0
  let exp = 0
  for (let i = 0; i < lastWeekData.length; i++){
    if (lastWeekData[i].type == 'Expense') {
      exp = exp + Number(lastWeekData[i].amount);
    }
    else {
      inc = inc + Number(lastWeekData[i].amount);
     
    }
  }

    return (
      <div>
        <Protected />
        <div className={styles.header}>
          <h2>Total Expense: ₹{ exp}</h2>
          <h2>Total Income: ₹{inc}</h2>
        </div>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount(₹)</th>
                    <th>Category</th>
                    <th>Notes</th>
                </tr>
                {lastWeekData.map((ele) => (
                    <tr>
                        <td>{ele.date}</td>
                        <td style={ele.type == 'Expense' ? { color: 'red' } :{color:'green'}}>{ele.type}</td>
                        <td>{ele.amount}</td>
                        <td>{ele.cat}</td>
                        <td>{ele.notes}</td>
                    </tr>
                )
                    
                )}
        </table>
      </div>
    )
}