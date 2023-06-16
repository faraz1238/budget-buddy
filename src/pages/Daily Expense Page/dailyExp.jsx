import styles from "./dailyExp.module.css";
import {
  atomCurrentUser,
  atomData,
  atomDate,
  atomisExpenseVisible,
  atomisIncomeVisible,
} from "../../const data/data";
import { useRecoilState } from "recoil";
import ReactDatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "react-datepicker/dist/react-datepicker.css";
import { AddExp } from "../../Sections/addExpenseDiv/addExpense";
import { AddInc } from "../../Sections/addIncomeDiv/addIncome";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Protected from "../../utils/Protected";

export function DailyExp() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(atomCurrentUser);
  const [date, setDate] = useRecoilState(atomDate);
  const [data, setData] = useRecoilState(atomData);
  const [expData, setExpData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [totalExp, setTotalExp] = useState(null)
  const [totalInc, setTotalInc] = useState(null)
  useEffect(() => {
    let tempData = data.filter(
      (ele) =>
        ele.type === "Expense"
        &&
        
         ele.date=== `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
    let incData = data.filter(
      (ele) =>
        ele.type === "Income" &&
        ele.date ===
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    
    );
  
    setIncomeData(incData);
    setExpData(tempData);
    if (incomeData.length != 0) {
      const sum = incomeData.reduce((acc, ele) => {
        return acc +  Number(ele.amount);
      },0)
      setTotalInc(sum)
      console.log(incomeData)
    }
    else 
      setTotalInc(0)
    if (expData.length != 0) {
      const sum = expData.reduce((acc, ele) => {
        return acc + Number(ele.amount);
      }, 0)
      setTotalExp(sum)
    }
    else
    setTotalExp(0)
  });



  const [isAddExpVisible, setIsAddExpVisible] =
    useRecoilState(atomisExpenseVisible);
  const [isAddIncVisible, setIsAddIncVisible] =
    useRecoilState(atomisIncomeVisible);
  const [isDateVisible, setIsDateVisible] = useState(true);

  function handleAddExpense() {
    setIsAddExpVisible(true);
    setIsAddIncVisible(false);
  }
  function handleAddIncome() {
    setIsAddExpVisible(false);
    setIsAddIncVisible(true);
  }
  function handleDateChange(date) {
    setDate(date);
    setIsDateVisible(true);
  }

  function increaseDate() {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  }
  function decreaseDate() {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    console.log(newDate)
    setDate(newDate);
  }
  function handleDelete(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
    
          let tempData = data.filter((ele) => ele.id !== index);
          setData(tempData);
          localStorage.setItem("data", JSON.stringify(data));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your data is safe",
            "error"
          );
        } //Never be alone
      });
  }

  return (
    <div className={styles.container}>
      <Protected/>
      <div
        className={styles.topSection}
        style={
          isAddExpVisible || isAddIncVisible ? { filter: "blur(5px)" } : {}
        }
      >
        <ArrowBackIosIcon onClick={decreaseDate} id={styles.icon} />
        {isDateVisible ? (
          <span
            className={styles.dateSpan}
            onClick={() => setIsDateVisible(false)}
          >{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</span>
        ) : (
          <ReactDatePicker
            showIcon
            selected={date}
            onChange={(date) => handleDateChange(date)}
            placeholderText={date}
            popperClassName={styles.datePopper}
          />
        )}
        <ArrowForwardIosIcon onClick={increaseDate} id={styles.icon} />
      </div>
      <div
        className={styles.displDiv}
        style={
          isAddExpVisible || isAddIncVisible ? { filter: "blur(5px)" } : {}
        }
      >
        <div className={styles.expDiv}>
          <h2>Total Expense: ₹{totalExp}</h2>
          <Button
            id={styles.addExpBtn}
            onClick={handleAddExpense}
            variant="contained"
          >
            Add New Expense
          </Button>
          {expData.map((ele, i) => (
            <div className={styles.trans}>
              <span> ₹{ele.amount}</span> 
              <span>{ele.cat}</span>
              <DeleteIcon sx={{cursor:'pointer'}} onClick={() => handleDelete(ele.id)} />
            </div>
          ))}
        </div>
        <div className={styles.incDiv}>
          <h2>Total 
            Income: ₹{totalInc}
        </h2>
          <Button
            id={styles.addIncBtn}
            onClick={handleAddIncome}
            variant="contained"
          >
            Add New Income
          </Button>
          {incomeData.map((ele, i) => (
            <div className={styles.transInc}>
              <span> ₹{ele.amount}</span> 
              <span>{ele.cat}</span>
              <DeleteIcon onClick={() => handleDelete(ele.id)} />
            </div>
          ))}
        </div>
      </div>

      {isAddExpVisible && <AddExp />}
      {isAddIncVisible && <AddInc />}
    </div>
  );
}
