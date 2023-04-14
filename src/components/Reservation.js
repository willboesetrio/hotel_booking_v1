import React, {useState, useEffect} from 'react'
import styles from './Reservation.module.css'

function Reservation({ reservation, deleteReservation, roomTypesArray }) {

const [roomRate, setRoomRate] = useState('');

useEffect(() =>{
  const matchRoomType = (room) => {
    if (room.id == reservation.roomTypeId) {
      return room;
    }
  }
  const currentRoomType = roomTypesArray.filter(matchRoomType);
  setRoomRate(currentRoomType[0].rate)
},[])

  return (
      <div key={reservation.id} className={styles.card}>
          <h3>reservation # {reservation.id}</h3>
          <p>check in date: {reservation.checkInDate}</p>
          <p>guest email: {reservation.guestEmail}</p>
          <p>number of nights: {reservation.numberOfNights}</p>
          <p>room type id: {reservation.roomTypeId}</p>
          <p>total cost: {roomRate * reservation.numberOfNights}</p>
          <button onClick={() => deleteReservation(reservation.id)}>DELETE</button>
          <button>EDIT</button>
      </div>
  )
}

export default Reservation

// {let roomRate;
//   for (let i = 0; i < Array.length; i++) {
//     if(reservation.roomTypeId == roomTypesArray[i].id) {
//       roomRate = roomTypesArray[i].rate;
//     }
//   }}