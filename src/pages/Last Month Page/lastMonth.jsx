import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { atomData, monthArray } from "../../const data/data";
import Protected from "../../utils/Protected";
import styles from "./lastMonth.module.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export function LastMonth() {
  let inc = 0;
  let exp = 0;
  let [index, setIndex] = useState(0);
  const [totalInc, setTotalInc] = useState(0)
  const [totalExp, setTotalExp] = useState(0)
  const printRef = useRef()
  const [data, setData] = useRecoilState(atomData);
  const currentDate = new Date();
  let filteredArray = [];
  const [displayArr, setDisplayArr] = useState([]);
  const oneMonthAgo = currentDate.getMonth() + 1;
  //console.log(currentDate ,oneMonthAgo)

  function handleMonthChange(e) {
    filteredArray = data.filter((obj) => {
      const [day, month, year] = obj.date.split("/");
      let objDate = new Date(`${month}/${day}/${year}`);
      setIndex(e.target.value);
      console.log("index",index)
      objDate = objDate.getMonth();

      return objDate == e.target.value;
    });

    setDisplayArr(filteredArray);
    for (let i = 0; i < filteredArray.length; i++) {
      if (filteredArray[i].type == "Expense") {
        exp = exp + Number(filteredArray[i].amount);
          setTotalExp(exp)
      } else {
        inc = inc + Number(filteredArray[i].amount);
        setTotalInc(inc)
        
      }
    }
    
  }
  

   
 
    async function downloadPDF (){
      const sheetContent = printRef.current;
      const canvas = await html2canvas(sheetContent,);
      const imageData = canvas.toDataURL("image/png");
      const pdfDoc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a3",
        compress: false,
      });
      pdfDoc.addImage(imageData, "PNG", 0, 0, 300, 100, "", "FAST");
      pdfDoc.save(`${monthArray[index]}-Transactions.pdf`);
      console.log(index)
      }
    

  return (
    <div>
      <Protected />
      <div>
        <span>Please select a month: </span>
        <select
          onChange={(e) => {
            handleMonthChange(e);
          }}
        >
          <option>Select Month</option>
          {monthArray.map((ele, i) => (
            <option value={i}>{ele}</option>
          ))}
        </select>
      </div>
      {displayArr.length == 0 ? (
        <div>
          <h1>No transactions in this month</h1>
        </div>
      ) : (
        <div>
          <div className={styles.header}>
            <h2>Total Expense: ₹{totalExp}</h2>
            <h2>Total Income: ₹{totalInc}</h2>
          </div>
          <table ref={printRef}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount(₹)</th>
              <th>Category</th>
              <th>Notes</th>
            </tr>
            {displayArr.map((ele) => (
              <tr>
                <td>{ele.date}</td>
                <td
                  style={
                    ele.type == "Expense"
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {ele.type}
                </td>
                <td>{ele.amount}</td>
                <td>{ele.cat}</td>
                <td>{ele.notes}</td>
              </tr>
            ))}
            </table>
            <Button id={styles.pdfBtn} onClick={downloadPDF} variant="contained"> <PictureAsPdfIcon
            fontSize="large"
            /></Button>
          </div>
          
      )}

    </div>
  );
}
