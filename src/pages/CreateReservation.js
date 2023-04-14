import { useState, useEffect } from 'react'

function CreateReservation() {

    // state variables to create reservation
    const [email, setEmail] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [numberOfNights, setNumberOfNights] = useState("");
    const [roomTypesArray, setRoomTypesArray] = useState([]);
    const[roomType, setRoomType] = useState("");

    // regular expressions
    const emailRegEx = '';
    const dateRegEx = '';

    // state variables to validate user input
    const [emailError, setEmailError] = useState(false);
    const [dateError, setDateError] = useState(false);

    useEffect(() => {
      const getRoomTypes= async() => {
  
        const response = await fetch("http://localhost:8080/room-types", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        const myRoomTypes = await response.json();
        console.log(myRoomTypes);
        setRoomTypesArray(myRoomTypes);
        setRoomType(myRoomTypes[0].name)
      }
        getRoomTypes();
    }, [])

    const handleCreate = () => {
        const payloadObject = {
            email: email,
            checkInDate: checkInDate,
            numberOfNights: numberOfNights,
            roomType: roomType
        }
        console.log(payloadObject);

        // check email input
        if(!payloadObject.email.match(emailRegEx)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        
        // check date input
        if(!payloadObject.checkInDate.match(dateRegEx)) {
          setDateError(true);
        } else {
          setDateError(false);
        }

    }


  return (
    <div>
        <h4>Create Reservation:</h4>
        <label htmlFor='email'>Email:</label>
        <input type="email" id='email' onChange={e => setEmail(e.target.value)} value={email} required></input>
        <br /><br />
        <label htmlFor='checkInDate'>Check In Date:</label>
        <input type="text" id='checkInDate' onChange={e => setCheckInDate(e.target.value)} value={checkInDate} required></input>
        <br /><br />
        <label htmlFor='numberOfNights'>Number of Nights:</label>
        <input type="number" id='numberOfNights' onChange={e => setNumberOfNights(e.target.value)} value={numberOfNights} required min={1}></input>
        <br /><br />
        <label htmlFor='roomType'>Room Type:</label>
        <select id='roomType' name='roomType' onChange={e => setRoomType(e.target.value)} value={roomType}>
            {roomTypesArray.map((roomType) => {
                return(
                    <option value={roomType.name} key={roomType.id}>{roomType.name}</option>
                )
            })}
        </select>
        <br /><br />
        <button onClick={() => handleCreate()}>Create Reservation</button>
    </div>
  )
}

export default CreateReservation