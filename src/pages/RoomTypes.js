import { useState, useEffect } from 'react'

function RoomTypes() {

  const [roomTypesArray, setRoomTypesArray] = useState([]);

  useEffect(() => {
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
        {roomTypesArray.length > 0 && roomTypesArray.map((roomType) => {
            return (
                //maybe put this map logic in a function rather than the JSX
                <div key={roomType.id}>
                    <h3>Name: {roomType.name}</h3>
                    <p>description: {roomType.description}</p>
                    <button>DELETE</button><button>EDIT</button>
                </div>
            )
        })}
    </div>
  )
}

export default RoomTypes