import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function CreateRoomType() {

  const navigate = useNavigate();

  useEffect(() => {

    const userRole = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])).roles;

    if (userRole !== "manager") {
      navigate('/reservations');
    }
  },[])


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState("");
    const [active, setActive] = useState(false);
    const [formClicked, setFormClicked] = useState(false);

    // errors
    const [nameError, setNameError] = useState(false);
    const [rateError, setRateError] = useState(false);

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

  const postNewRoomType = async (payloadObject) => {

    const response = await fetch("http://localhost:8080/room-types", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(payloadObject)
    })
    if (response.status == 201) {
      console.log("THE POST WENT THROUGH");
      navigate('/room-types');
      
    }

  }


    const handleCreate = () => {
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
          postNewRoomType(payloadObject);
        } else {
          console.log("VALIDATION NOT PASSED")
        }
    }

  return (
    <div>
        <h4>Create Room Type</h4>
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
        <input type="checkbox" id="active" onChange={e => setActive(!active)} value={active}></input>
        <br /><br />
        <button onClick={() => handleCreate()}>Create Room Type</button>
    </div>
  )
}

export default CreateRoomType