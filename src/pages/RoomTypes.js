import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomType from '../components/RoomType';
import { Dna } from  'react-loader-spinner'

/**
 * @name RoomTypes
 * @description displays all room types
 * @returns component
 */
function RoomTypes() {

  const [roomTypesArray, setRoomTypesArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const userRole = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).roles;

    if (userRole !== "manager") {
      navigate('/reservations');
    }

    /**
     * @name getRoomTypes
     * @description fetch call to get room types
     */
    const getRoomTypes= async() => {

      try {
        const response = await fetch("http://localhost:8080/room-types", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        const myRoomTypes = await response.json();
        console.log(myRoomTypes);
        if(response.status == 200) {
        setRoomTypesArray(myRoomTypes);
        setLoading(false);
        }
      } catch(err) {
        setServerError(true);
        setLoading(false);
      }
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
      // if successful, remove the reservation from the state array and rerender the reservations
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
      } 
    } catch (error) {
      console.log(error);
      console.log("delete not succesful, AN ERROR OCCURED")
    }
  }
    

  return (
    <div>
        <h2>Room Types</h2>
        {!loading && !serverError &&
          <button onClick={() => navigate("/room-types/create")}>CREATE ROOM TYPE</button>
        }
        {loading && <
          Dna
            visible={true}
            height="180"
            width="180"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />}
          {serverError && <p>oops, something went wrong</p>}
        {roomTypesArray.length > 0 && roomTypesArray.map((roomType) => {
            return (
                <RoomType key={roomType.id} roomType={roomType} deleteRoomType={deleteRoomType}/>
            )
        })}
    </div>
  )
}

export default RoomTypes