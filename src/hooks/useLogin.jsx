import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function useLogin() {

  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const login = async(email, password) => {

      const response = await fetch("http://localhost:8080/login", {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email, password})
      })
      
      if(response.ok) {

        const myToken = await response.json();
        
        const user = JSON.parse(atob(myToken.token.split('.')[1]));
        sessionStorage.setItem("token", myToken.token);
        setIsLogged(true);
        navigate("/reservations");

      } else {
          console.log("INVALID LOGIN ATTEMPT")
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
   isLogged, login, logout
  }
}

export default useLogin;