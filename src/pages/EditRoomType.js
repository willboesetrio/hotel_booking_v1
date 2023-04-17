import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function EditRoomType() {

    const navigate = useNavigate();

    useEffect(() => {
  
      const userRole = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).roles;
  
      if (userRole !== "manager") {
        navigate('/reservations');
      }
    },[])

  return (
    <div>EditRoomType</div>
  )
}

export default EditRoomType