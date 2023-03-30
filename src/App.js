import './App.css';
import { useRef, useState, useCallback } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import RoomTypes from './pages/RoomTypes';
import NotFound from './pages/NotFound';
import useLogin from './hooks/useLogin';


function App() {

  const {isLogged, login, logout} = useLogin();

  //const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [userRole, setUserRole] = useState("");

  const handleUserRole = (newRole) => {
    setUserRole(newRole);
    console.log("this function was passed down as a prop then called from the login component");
  }
  

  return (
    
    <div className="App">
      <div>
        <Navbar logout={logout} isLogged={isLogged} userRole={userRole}/>
        {isLogged ? <Routes>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/room-types" element={<RoomTypes />} />
          <Route path="*" element={<NotFound />} />
        </Routes> : <Login  login={login} handleUserRole={handleUserRole} />
        }
        
      </div>
    </div>
  );
}

export default App;