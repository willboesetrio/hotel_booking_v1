import './App.css';
import { useRef, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import RoomTypes from './pages/RoomTypes';
import NotFound from './pages/NotFound';

function App() {

  // const emailRef = useRef();
  // const passwordRef = useRef();
  // //let [currentToken, setCurrentToken] = useState('');//store token in session storage, not state
  // let [userEmail, setUserEmail] = useState('');
  // let [userRole, setUserRole] = useState('');
  // let [loggedIn, setLoggedIn] = useState(false);

  // const postLogin = async() => {
  //   const postObject = {
  //     "email" : emailRef.current.value,
  //     "password" : passwordRef.current.value
  //   }
  //   const response = await fetch("http://localhost:8080/login", {
  //     method : "POST",
  //     //credentials: 'same-origin',//not the right credentials, but include does not work
  //     headers : {
  //       "Content-Type": "application/json",
  //     },
  //     body : JSON.stringify(postObject)
  //   })
  //   const myToken = await response.json();
  //   console.log(myToken.token);
  //   // this is setting token to state, we want it in session storage
  //   //setCurrentToken(myToken.token);
  //   const user = JSON.parse(atob(myToken.token.split('.')[1]));
  //   console.log(user);
  //   sessionStorage.setItem("token", myToken.token)
  //   setLoggedIn(true);
  //   setUserEmail(user.sub);
  //   setUserRole(user.roles);
  // }

  // const getReservations = async() => {

  //   const response = await fetch("http://localhost:8080/reservations", {
  //     method : "GET",
  //     headers : {
  //       "Content-Type" : "application/json",
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`
  //     }
  //   })
  //   const myReservation = await response.json();
  //   console.log(myReservation);
  // }

  // const getRoomTypes= async() => {

  //   const response = await fetch("http://localhost:8080/room-types", {
  //     method : "GET",
  //     headers : {
  //       "Content-Type" : "application/json",
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`
  //     }
  //   })
  //   const myReservation = await response.json();
  //   console.log(myReservation);
  // }

  return (
    <BrowserRouter>
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/room-types" element={<RoomTypes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;