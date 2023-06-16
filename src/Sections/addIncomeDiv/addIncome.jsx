import styles from "./addIncome.module.css";
import { atomData, atomDate, atomisIncomeVisible } from "../../const data/data";
import { useRecoilState } from "recoil";
import { Button, Input } from "../../components";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

export function AddInc() {
  const [inc, setInc] = useState(null);
  const [cat, setCat] = useState("");
  const [data,setData] = useRecoilState(atomData)
    const [date, setDate] = useRecoilState(atomDate)
  const [isAddIncVisible, setIsAddIncVisible] = useRecoilState(atomisIncomeVisible)
  let currentDate = new Date()

  function handleAddIncome() {
    if (!inc) {
      Swal.fire("Please enter the Income Amount ")
    }
    else if (!cat) {
      Swal.fire("Please enter the Income Category")
    }
    else if(date>currentDate){
     Swal.fire("Cannot make an entry for a future date")
    }

    else {
      const temp = {
        id:nanoid(),
        type:'Income',
        cat: cat,
        amount: Number(inc),
        date:`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`
      }
      setData([...data, temp])
      localStorage.setItem('data', JSON.stringify(data))
      setIsAddIncVisible(!isAddIncVisible)
    }
   
  }
  return (
    <div className={styles.container}
  
    >
      <div className={styles.header}>
      <h1>Add Income</h1>
      <span onClick={()=>setIsAddIncVisible(false)}>❌</span>
     </div>
      <div className={styles.wrapper}>
        <label>Category:</label>
        <Input
          class="incInp"
          value={cat}
          type="text"
          func={(e) => setCat(e.target.value)}
        />
        <br />
        <label>Amount:</label>
        <Input
      
          class="incInp"
          value={inc}
          type="number"
          func={(e) => setInc(e.target.value)}
        />
        <br />
        <label >Notes</label>
        <textarea name="" id="" cols="10" rows="10"></textarea>
        <Button func={handleAddIncome}  class="addBtn" text="Submit" on />
      </div>
    </div>
  );
}
