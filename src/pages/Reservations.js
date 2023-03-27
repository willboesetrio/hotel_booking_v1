import { useState } from 'react'
import styles from "./Reservations.module.css"


function Reservations() {

    const [reservationsArray, setReservationsArray] = useState([]);

    const getReservations = async() => {

        const response = await fetch("http://localhost:8080/reservations", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        const myReservations = await response.json();
        console.log(myReservations);
        setReservationsArray(myReservations);
      }

  return (
    <div>
        <h2>Reservations</h2>
        <button onClick={getReservations}>TEST GET RESERVATIONS</button>
        {reservationsArray.map((reservation) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <div key={reservation.id} className={styles.card}>
                    <h3>reservation # {reservation.id}</h3>
                    <p>check in date: {reservation.checkInDate}</p>
                    <p>guest email: {reservation.guestEmail}</p>
                    <p>number of nights: {reservation.numberOfNights}</p>
                    <p>room type id: {reservation.roomTypeId}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Reservations