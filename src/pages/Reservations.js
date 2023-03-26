import React from 'react'

function Reservations() {

    const getReservations = async() => {

        const response = await fetch("http://localhost:8080/reservations", {
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
        <h2>Reservations</h2>
        <button onClick={getReservations}>TEST GET RESERVATIONS</button>
    </div>
  )
}

export default Reservations