import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Reservations.module.css"
import Reservation from '../components/Reservation';


function Reservations() {

    const [reservationsArray, setReservationsArray] = useState([]);
    const [roomTypesArray, setRoomTypesArray] = useState([]);
    //ideally this user status would be on the App.js component level, then get passed down as props
    const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
    //this console log happens twice initially(maybe due to strict mode), then way too many times(onRerender?)
    console.log(user);
    const navigate = useNavigate();

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
      getRoomTypes();
      setTimeout(() => getReservations(), 2000);
      console.log(roomTypesArray);
    }, [])

    const deleteReservation = async(id) => {

      try{

      const response = await fetch(`http://localhost:8080/reservations/${id}`, {
          method : "DELETE",
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        //const data = await response.json();
        //console.log(data);
        // if successful, we must remove the reservation from the state array and rerender the reservations
        if (response.status == 204) {
          console.log('successful delete');
          console.log(response.status)
           let currentIndex;
           for (let i = 0; i < reservationsArray.length; i++) {
           if (reservationsArray[i].id == id){currentIndex = i}
          }
         const previousState = [...reservationsArray];
         previousState.splice(currentIndex, 1);
         setReservationsArray(previousState);
        } //else {
          //console.log("delete not succesful, AN ERROR OCCURED")
        //}
      } catch (error) {
        console.log(error);
        console.log("delete not succesful, AN ERROR OCCURED")
      }
    }


  return (
    <div>
        <h2>Reservations</h2>
        <p>now logged in as: {user.sub} role: {user.roles}</p>
        <button onClick={() => navigate("/reservations/create")}>CREATE RESERVATION</button>
        {reservationsArray.length > 0 && reservationsArray.map((reservation) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <Reservation reservation={reservation} deleteReservation={deleteReservation} roomTypesArray={roomTypesArray}/>
            )
        })}
    </div>
  )
}

export default Reservations