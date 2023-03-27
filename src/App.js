import './App.css';
import { useRef, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import RoomTypes from './pages/RoomTypes';
import NotFound from './pages/NotFound';

function App() {

  //const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

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