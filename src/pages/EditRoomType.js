import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function EditRoomType() {

  const navigate = useNavigate();
  const location = useLocation();
  const currentId = location.pathname.slice(-1);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [active, setActive] = useState(true);
  const [formClicked, setFormClicked] = useState(false);

  // errors
  const [nameError, setNameError] = useState(false);
  const [rateError, setRateError] = useState(false);

    useEffect(() => {
  
      const userRole = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).roles;
  
      if (userRole !== "manager") {
        navigate('/reservations');
      }
    },[])

    useEffect(() => {
      if (name.length < 3) {
        setNameError(true)
      } else {
        setNameError(false)
      }
  },[name])

  useEffect(() => {
    if (rate <= 0) {
      setRateError(true)
    } else {
      setRateError(false)
    }
  },[rate])

useEffect(() => {

  const getCurrentRoomType = async() => {

    const response = await fetch(`http://localhost:8080/room-types/${currentId}`, {
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
    const currentReservation = await response.json();
    console.log('GETTING CURRENT RES')
    console.log(currentReservation);
    setName(currentReservation.name);
    setDescription(currentReservation.description);
    setRate(currentReservation.rate);
    setActive(currentReservation.active);


  }
    getCurrentRoomType();
}, [currentId])

    const putRoomType = async (payloadObject) => {

      console.log(payloadObject);

      const response = await fetch(`http://localhost:8080/room-types/${currentId}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payloadObject)
      })
      if (response.status == 200) {
        console.log("THE PUT WENT THROUGH");
        navigate('/room-types');
        
      }

    }

    const handleUpdate = () => {

      setFormClicked(true);
      const payloadObject = {
        name: name,
        description: description,
        rate: parseFloat(rate),
        active: active
    }

      if (nameError===false && rateError===false){
        console.log(payloadObject);
        console.log('VALIDATION PASSED');
        putRoomType(payloadObject);
      } else {
        console.log("VALIDATION NOT PASSED")
      }

  }

  return (
    <div>
      <h4>Edit Room Type #{currentId}</h4>
      {nameError == true && formClicked && <p style={{color: 'red'}}>Name must be three or more chars</p>}
      <label htmlFor='name'>Name:</label>
      <input type="text" id='name' onChange={e => setName(e.target.value)} value={name} required></input>
      <br /><br />
      <label htmlFor='description'>Description:</label>
      <input type="textarea" id='description' onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50" required></input>
      <br /><br />
      {rateError == true && formClicked && <p style={{color: 'red'}}>Rate must be greater than zero</p>}
      <label htmlFor='rate'>Rate:</label>
      <input type="number" id='rate' onChange={e => setRate(e.target.value)} value={rate} required min={0}></input>
      <br /><br />
      <label htmlFor='active'>Active: </label>
      <input type="checkbox" id="active" onChange={e => setActive(!active)} value={active} checked={active}></input>
      <br /><br />
      <button  onClick={() => handleUpdate()}>Update Room Type</button>
    </div>
  )
}

export default EditRoomType