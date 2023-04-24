import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * @name RoomType
 * @description displays an individual room type
 * @param {*} props roomType, deleteRoomType
 * @returns component
 */
function RoomType({roomType, deleteRoomType}) {

    const navigate = useNavigate();

  return (
    <div key={roomType.id}>
        <h3>Name: {roomType.name}</h3>
        <p>description: {roomType.description}</p>
        <p>rate: {roomType.rate}</p>
        {roomType.active ? <p>ACTIVE</p> : <p>INACTIVE</p>}
        {/* <button onClick={() => deleteRoomType(roomType.id)}>DELETE</button> */}
        <button onClick={() => navigate(`/room-types/edit/${roomType.id}`)}>EDIT</button>
    </div>
  )
}

export default RoomType