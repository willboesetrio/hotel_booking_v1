import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateReservation() {

    const navigate = useNavigate();

    // state variables to create reservation
    const [email, setEmail] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [numberOfNights, setNumberOfNights] = useState("");
    const [roomTypesArray, setRoomTypesArray] = useState([]);
    const [roomType, setRoomType] = useState("");

    // regular expressions
    const emailRegEx = new RegExp('.+\@.+\..+')
    const dateRegEx = new RegExp('[0-1][0-9][/-][0-3][0-9][/-][0-9][0-9][0-9][0-9]$')
    // const emailRegEx = new RegExp('/^[\w-\.]+@([\w-\]+\.)+[\w-]{2,4}$/', 'g')
    // const emailRegEx = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}')

    // state variables to validate user input
    const [emailError, setEmailError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [numberOfNightsError, setNumberOfNightsError] = useState(false);
    const [formClicked, setFormClicked] = useState(false)

    // get token from session storage
    const token = sessionStorage.getItem('token');

    const postNewReservation = async (payloadObject) => {

      const response = await fetch("http://localhost:8080/reservations", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payloadObject)
      })
      if (response.status == 201) {
        console.log("THE POST WENT THROUGH");
        navigate('/reservations');
        
      }

    }

    useEffect(() => {
      if(!numberOfNights) {
        setNumberOfNightsError(true);
      } else {
        setNumberOfNightsError(false);
      }
    },[numberOfNights])

    useEffect(() => {
      if(!email.match(emailRegEx)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    },[email])

    useEffect(() => {
      if(!checkInDate.match(dateRegEx)) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    },[checkInDate])

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

        setFormClicked(true);
        //let matchRoomTypeToId;
        const testArray = roomTypesArray.filter((thisObj) =>{
          if (thisObj.name == roomType) {
            return thisObj;
            //console.log(matchRoomTypeToId)
          }
        })

        const payloadObject = {
            user: JSON.parse(atob(token.split('.')[1])).sub,
            guestEmail: email,
            checkInDate: checkInDate,
            numberOfNights: numberOfNights,
            roomTypeId: testArray[0].id
        }

        // // check email input
        // if(!payloadObject.guestEmail.match(emailRegEx)) {
        //   setEmailError(true);
        // } else {
        //   setEmailError(false);
        // }
        
        // // check date input
        // if(!payloadObject.checkInDate.match(dateRegEx)) {
        //   setDateError(true);
        // } else {
        //   setDateError(false);
        // }

        // // check number of nights
        // if(!payloadObject.numberOfNights) {
        //   setNumberOfNightsError(true);
        // } else {
        //   setNumberOfNightsError(false);
        // }

        if (emailError===false && dateError===false && numberOfNightsError===false){
          console.log(payloadObject);
          console.log('VALIDATION PASSED');
          //postNewReservation(payloadObject);
        } else {
          console.log("VALIDATION NOT PASSED")
        }

    }


  return (
    <div>
        <h4>Create Reservation:</h4>
        {emailError &&  formClicked && <p style={{color: 'red'}}>must be a valid email</p>}
        <label htmlFor='email'>Email:</label>
        <input type="email" id='email' onChange={e => setEmail(e.target.value)} value={email} required></input>
        <br /><br />
        {dateError && formClicked && <p style={{color: 'red'}}>date must be mm-dd-yyyy</p>}
        <label htmlFor='checkInDate'>Check In Date:</label>
        <input type="text" id='checkInDate' onChange={e => setCheckInDate(e.target.value)} value={checkInDate} required></input>
        <br /><br />
        {numberOfNightsError && formClicked && <p style={{color: 'red'}}>must be number greater than zero</p>}
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