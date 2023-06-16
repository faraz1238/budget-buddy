import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/button";
import { useRecoilState } from 'recoil'
import { atomIsSideBarVisible } from '../../const data/data'
export function Header() {
  const navigate = useNavigate();
  const [isSideBarVisible, setIsSideBarVisible] = useRecoilState(atomIsSideBarVisible)

  return (
    <header className={styles.header}>
      <h2
      onClick={()=>setIsSideBarVisible(!isSideBarVisible)}
      >Budget Buddy</h2>
      <div className={styles.btnDiv}>
        <Button
          class="headerBtn"
          func={() => navigate("/")}
          text="Daily Transactions"
        />
        <Button
          class="headerBtn"
          func={() => navigate("/lastWeek")}
          text="Transactions from Last Week"
        />
        <Button
          class="headerBtn"
          func={() => navigate("/lastMonth")}
          text="Monthly Transactions"
        />
      </div>
    </header>
  );
}
