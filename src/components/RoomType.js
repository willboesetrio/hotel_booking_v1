import React from 'react'
import { useNavigate } from 'react-router-dom'

function RoomType({roomType}) {

    const navigate = useNavigate();

  return (
    <div key={roomType.id}>
        <h3>Name: {roomType.name}</h3>
        <p>description: {roomType.description}</p>
        <p>rate: {roomType.rate}</p>
        {roomType.active ? <p>ACTIVE</p> : <p>INACTIVE</p>}
        <button>DELETE</button>
        <button onClick={() => navigate(`/room-types/edit/${roomType.id}`)}>EDIT</button>
    </div>
  )
}

export default RoomType