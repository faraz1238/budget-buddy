import React, {useState} from 'react'
import { Button, TextField } from '@mui/material'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../../utils/Serivces'
import Swal from 'sweetalert2'
import { useRecoilState } from 'recoil'
import { atomCurrentUser, atomSavings } from '../../const data/data'


export default function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [savings,setSavings] = useRecoilState(atomSavings)
  const [currUser, setCurrUser] = useRecoilState(atomCurrentUser)
  let users = getUsers()
  function handleRegister() {
    navigate('/register')
  }
  function handleLogin() {
    let currentUser = users.find((ele) => ele.email === email)
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email to continue',
      })
      return
    }
    if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not found! Please use an email which is already registered or create a new account',
      })
    }
    else {
      if (currentUser.pass !== pass) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect credentials',
        })
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
        currentUser.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        setCurrUser(currentUser)
        
       
         
        
       
          navigate("/")
      }
    }
  }
  
  return (
    <div>
      <div >
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
           <TextField onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" type='email' label="Email" variant="outlined" />
        <TextField onChange={(e)=>setPass(e.target.value)} id="outlined-basic" type='password' label="Password" variant="outlined" />
        <Button onClick={handleLogin} id={styles.submitBtn} variant='outlined'> Log In</Button>
        <div>
      <span>Dont have an account?</span><span
            onClick={handleRegister}
            className={styles.signUpText}> Sign Up</span>
   </div>
       </form>
          
      </div>
    
      </div>
  
  )
}
