import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atomSavings, atomUsers } from "../../const data/data";
export default function Register() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [users, setUsers] = useRecoilState(atomUsers);
 const [savings, setSavings] = useRecoilState(atomSavings)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  function handleAddUser() {
    
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !pass
    ) {
      Swal.fire("Please fill all the details to continue!");
    } else if (password.length < 8) {
      Swal.fire("Please enter a password of atleast 8 characters!");
    } else if (password!== pass) {
      Swal.fire("Please enter the same password in both the fields");
    } else {
      let newUser = {
        id: nanoid(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: password,
        isLoggedIn: false,
      };
     setUsers([...users, newUser])
      localStorage.setItem('users', JSON.stringify(users))
      Swal.fire({
        title: 'Almost Done',
        input: 'number',
        inputLabel: 'Please enter your current savings or if you want to start a new wallet please enter 0',
        inputPlaceholder: 'Enter your current savings in ₹',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit'
      }).then((result) => {
        if (result.isConfirmed) {
          setSavings(result.value); // Store the value in the state variable
          localStorage.setItem('savings', JSON.stringify(savings))
          Swal.fire(`Entered savings: ${result.value}`);
          console.log(savings)
         navigate('/login')
        }
      });
    }
    
  }
  return (
    <div>
      <h1>Register</h1>
      <div className={styles.form}>
        <TextField
          id="outlined-basic"
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) =>(setEmail(e.target.value))}
        />
        <TextField
          id="outlined-basic"
          type="text"
          label="First Name"
          variant="outlined"
          onChange={(e)=>{ setFirstName( e.target.value)}}
        />
        <TextField
          id="outlined-basic"
          type="text"
          label="Last Name"
          variant="outlined"
          onChange={(e) => {setLastName(e.target.value)}}
        />

        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Confirm Password"
          variant="outlined"
          onChange={(e) => setPass(e.target.value)}
        />
        <Button
          id={styles.submitBtn}
          onClick={handleAddUser}
          variant="outlined"
        >
          {" "}
          Register
        </Button>
        <div>
          <span>Already have an account?</span>
          <span
            onClick={() => navigate("/login")}
            className={styles.signUpText}
          >
            {" "}
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}
