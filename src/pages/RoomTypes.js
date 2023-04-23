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

  const deleteRoomType = async(id) => {

    try{

    const response = await fetch(`http://localhost:8080/room-types/${id}`, {
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
         for (let i = 0; i < roomTypesArray.length; i++) {
         if (roomTypesArray[i].id == id){currentIndex = i}
        }
       const previousState = [...roomTypesArray];
       previousState.splice(currentIndex, 1);
       setRoomTypesArray(previousState);
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
        <h2>Room Types</h2>
        <button onClick={() => navigate("/room-types/create")}>CREATE ROOM TYPE</button>
        {roomTypesArray.length > 0 && roomTypesArray.map((roomType) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <RoomType key={roomType.id} roomType={roomType} deleteRoomType={deleteRoomType}/>
            )
        })}
    </div>
  )
}

export default RoomTypes