import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomType from '../components/RoomType';

function RoomTypes() {

  const [roomTypesArray, setRoomTypesArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const userRole = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).roles;

    if (userRole !== "manager") {
      navigate('/reservations');
    }

    const getRoomTypes= async() => {

      const response = await fetch("http://localhost:8080/room-types", {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      })
      const myReservations = await response.json();
      console.log(myReservations);
      setRoomTypesArray(myReservations);
    }
    setTimeout(() => getRoomTypes(), 2000);
  }, [])
    

  return (
    <div>
        <h2>Room Types</h2>
        <button onClick={() => navigate("/room-types/create")}>CREATE ROOM TYPE</button>
        {roomTypesArray.length > 0 && roomTypesArray.map((roomType) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <RoomType key={roomType.id} roomType={roomType} />
            )
        })}
    </div>
  )
}

export default RoomTypes