import React from 'react'

function RoomTypes() {

    const getRoomTypes= async() => {

        const response = await fetch("http://localhost:8080/room-types", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        const myReservation = await response.json();
        console.log(myReservation);
      }

  return (
    <div>
        <h2>Room Types</h2>
        <button onClick={getRoomTypes}>TEST GET ROOM TYPES</button>
    </div>
  )
}

export default RoomTypes