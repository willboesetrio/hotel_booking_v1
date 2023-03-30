import { useState, useEffect } from 'react'
import styles from "./Reservations.module.css"


function Reservations() {

    const [reservationsArray, setReservationsArray] = useState([]);
    //ideally this user status would be on the App.js component level, then get passed down as props
    const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
    //this console log happens twice initially(maybe due to strict mode), then way too many times(onRerender?)
    console.log(user);

    useEffect(() =>{
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
      setTimeout(() => getReservations(), 2000);
    }, [])


  return (
    <div>
        <h2>Reservations</h2>
        <p>now logged in as: {user.sub} role: {user.roles}</p>
        {/* <button onClick={getReservations}>TEST GET RESERVATIONS</button> */}
        {reservationsArray.length > 0 && reservationsArray.map((reservation) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <div key={reservation.id} className={styles.card}>
                    <h3>reservation # {reservation.id}</h3>
                    <p>check in date: {reservation.checkInDate}</p>
                    <p>guest email: {reservation.guestEmail}</p>
                    <p>number of nights: {reservation.numberOfNights}</p>
                    <p>room type id: {reservation.roomTypeId}</p>
                    <button>DELETE</button><button>EDIT</button>
                </div>
            )
        })}
    </div>
  )
}

export default Reservations