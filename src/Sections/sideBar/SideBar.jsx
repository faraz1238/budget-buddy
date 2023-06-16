import React from "react";
import { useRecoilState } from "recoil";
import { atomCurrentUser, atomIsSideBarVisible } from "../../const data/data";
import "./SideBar.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function SideBar() {
  const [isSideBarVisible, setIsSideBarVisible] =
    useRecoilState(atomIsSideBarVisible);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(atomCurrentUser);
  const [isVisible, setIsVisible] = useState(true);
  function logOut() {
    if (currentUser.isLoggedIn == true) {
      Swal.fire({
        title: "Confirm Logout?",
        text: "You will be logged out of your account!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Done", "You have been logged out.", "success");
          let temp = { ...currentUser };
          temp.isLoggedIn = false;
          setCurrentUser(temp);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
      });
      setIsSideBarVisible(!isSideBarVisible);
    } else {
      Swal.fire("You are not logged in!");
      setIsSideBarVisible(!isSideBarVisible);
    }
  }
  function handleAboutUs() {
    navigate("/aboutus");
    setIsSideBarVisible(!isSideBarVisible);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 1600);
  }, []);
  return (
    <div className={`sidebar ${isSideBarVisible ? "visible" : ""}`}>
      {isVisible && (
        <div>
          <img
            style={{ width: "104.9rem", height: "46rem" }}
            src="https://media0.giphy.com/media/rM0wxzvwsv5g4/giphy.gif?cid=ecf05e47npmvhj7ij8t3n72t5serwmu2ofuyaojyj3lw1u8b&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt=""
          />
        </div>
      )}
      <div
        className="menuDiv"
        onClick={() => {
          navigate("/yourdata");
          setIsSideBarVisible(!isSideBarVisible);
        }}
      >
        Your Data
      </div>
      <div className="menuDiv" onClick={handleAboutUs}>About Us</div>
      <div className="menuDiv" onClick={logOut}>
        Logout
      </div>
    </div>
  );
}
