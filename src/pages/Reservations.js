import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Reservations.module.css"
import Reservation from '../components/Reservation';
import { Dna } from  'react-loader-spinner'

/**
 * @name Reservations
 * @description displays all reservations
 * @returns component
 */
function Reservations() {

    const [reservationsArray, setReservationsArray] = useState([]);
    const [roomTypesArray, setRoomTypesArray] = useState([]);
    const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    console.log(user);
    const navigate = useNavigate();

    useEffect(() =>{
      const getReservations = async() => {
        setLoading(true);
        try{
          const response = await fetch("http://localhost:8080/reservations", {
            method : "GET",
            headers : {
              "Content-Type" : "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          })
          const myReservations = await response.json();
          console.log(myReservations);
          if(response.status == 200) {
            setReservationsArray(myReservations);
            setLoading(false);
          }
        }catch(err) {
          setServerError(true);
          setLoading(false);
        }
        }
      
      /**
       * @name getRoomTypes
       * @description fetch call to get room types
       */
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
      setTimeout(() => getReservations(), 3000);
      console.log(roomTypesArray);
    }, [])

    /**
     * @name deleteReservation
     * @description deletes an individual reservation
     * @param {*} id 
     */
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
        {!loading && !serverError &&
          <button onClick={() => navigate("/reservations/create")}>CREATE RESERVATION</button>
        }
        <br />
        {loading && <
          Dna
            visible={true}
            height="180"
            width="180"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />}
          {serverError && <p className={styles.err}>oops, something went wrong</p>}
        {reservationsArray.length > 0 && reservationsArray.map((reservation) => {
            return (
                <Reservation key={reservation.id}reservation={reservation} deleteReservation={deleteReservation} roomTypesArray={roomTypesArray}/>
            )
        })}
    </div>
  )
}

export default Reservations