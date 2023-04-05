import { useState } from 'react'


function CreateRoomType() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState("");
    const [active, setActive] = useState("");

    const handleCreate = () => {
        const payloadObject = {
            name: name,
            description: description,
            rate: rate,
            roomType: roomType
        }
        console.log(payloadObject);
    }

  return (
    <div>
        <h4>CreateRoomType</h4>
        <label htmlFor='name'>Name:</label>
        <input type="text" id='name' onChange={e => setName(e.target.value)} value={name} required></input>
        <br /><br />
        <label htmlFor='description'>Description:</label>
        <input type="textarea" id='description' onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50" required></input>
        <br /><br />
        <label htmlFor='rate'>Rate:</label>
        <input type="number" id='rate' onChange={e => setRate(e.target.value)} value={rate} required min={0}></input>
        <br /><br />
        <label htmlFor='active'>Active: </label>
        <input type="checkbox" id="active" onChange={e => setActive(e.target.value)} value={active}></input>
        <br /><br />
        <button onClick={() => handleCreate()}>Create Room Type</button>
    </div>
  )
}

export default CreateRoomType