import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { atomCurrentUser } from '../const data/data';

export default function Protected() {
    const currentUser = useRecoilValue(atomCurrentUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (currentUser.isLoggedIn !== true) {
         
          navigate("/login");
        }
      }, [currentUser]);
  return 
    
  
}
