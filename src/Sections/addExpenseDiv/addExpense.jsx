import styles from "./addExpense.module.css";
import { atomData, atomisExpenseVisible, atomDate } from "../../const data/data";
import { useRecoilState } from "recoil";
import { Button, Input } from "../../components";
import { useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from "nanoid";

export function AddExp() {
  const [isAddExpVisible, setIsAddExpVisible] = useRecoilState(atomisExpenseVisible);
  const [data, setData] = useRecoilState(atomData)
  const [exp, setExp] = useState(null);
  const [cat, setCat] = useState("");
  const [notes,setNotes] = useState("")
  const [date, setDate] = useRecoilState(atomDate);
  const currentDate = new Date();
  function handleAddExpense() {
    if (!exp) {
      Swal.fire("Please enter the Expense Amount ")
    }
    else if (!cat) {
      Swal.fire("Please enter the Expense Category")
    }
    else if(date>currentDate){
     Swal.fire("Cannot make an entry for a future date")
    }

  
    else {
    
      const temp = {
        id:nanoid(),
        type:'Expense',
        notes:notes,
        cat: cat,
        amount: Number(exp),
        date:`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`
        
      };
    
      setData([...data, temp])
      localStorage.setItem('data', JSON.stringify(data))
      setCat("")
      setExp(null)
      setNotes("")
      setIsAddExpVisible(!isAddExpVisible)
   }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 >Add Expense</h1>
        <span onClick={() => setIsAddExpVisible(false)}>❌</span>
      </div>
      <div className={styles.wrapper}>
        <label>Category:</label>
        <Input
          placeholder="Food, Transport, Health, Entertainment, others"
          class="incInp"
          value={cat}
          type="text"
          func={(e) => setCat(e.target.value)}
        />
        <br />
        <label>Amount(₹):</label>
        <Input
          placeholder="Enter amount in ₹"
          class="incInp"
          value={exp}
          type="number"
          func={(e) => setExp(e.target.value)}
        />
        <br />
        <label>Notes</label>
        <textarea
          onChange={(e)=>setNotes(e.target.value)}
          name="" id="" cols="10" rows="10"></textarea>
        {/* <label htmlFor=""> Date:</label> */}
        {/* <ReactDatePicker
          showIcon
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText={date}
        /> */}
        <Button func={handleAddExpense} class="addBtn" text="Submit" on />
      </div>
    </div>
  );
}
