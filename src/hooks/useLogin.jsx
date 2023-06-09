import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

/**
 * @name useLogin
 * @description custom hook to handle login state
 * @returns isLogged, login, logout, invalid, setInvalid
 */
function useLogin() {

  const [isLogged, setIsLogged] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  

  const login = async(email, password) => {

      const response = await fetch("http://localhost:8080/login", {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email, password})
      })
      if(response.status === 400) {
        setInvalid(true);
        console.log('400 error from login');
        console.log(invalid)
      }
      if(response.ok) {

        const myToken = await response.json();
        
        const user = JSON.parse(atob(myToken.token.split('.')[1]));
        sessionStorage.setItem("token", myToken.token);
        setIsLogged(true);
        setInvalid(false);
        navigate("/reservations");

      } else {
          console.log("INVALID LOGIN ATTEMPT")
          setInvalid(true);
        console.log('400 error from login');
        console.log()
      }
    }

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  }


  useEffect(() =>{
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      setIsLogged(true);
    } 
  }, [])

  return {
   isLogged, login, logout, invalid, setInvalid
  }
}

export default useLogin;