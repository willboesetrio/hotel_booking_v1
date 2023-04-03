import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

//ideally we would reserve our user permissions as props passed down from the main component,
//then conditionally render certain links based on user permissions
function Navbar({logout, userRole, isLogged}) {

  //const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
  const [user, setUser] = useState("");
  let [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      if (sessionStorage.getItem("token") != null) {
        setUser(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])))
        console.log(user);
        console.log(user.roles);
        //console.log(userRole)
        console.log("testing useEffect in navbar")
        console.log(user);
      }
  }, [isLogged])


  return (
    <nav className={styles.navigation}>
      <h1 className={styles.companyName}>Hotel Bookings</h1>
      <ul className={styles.list}>
      { isLogged && <li className={styles.item}>
        <Link to='/reservations' className={styles.link}>Reservations</ Link>
      </li>
      }
      { isLogged && user.roles == "manager" &&
      <li className={styles.item}>
        <Link to='/room-types' className={styles.link}>Room Types</ Link>
      </li>
      }
      { isLogged &&
      <li className={styles.item}>
        <Link to='/' onClick={logout} className={styles.link}>Log Out</ Link>
      </li>
      }
      </ul>
    </nav>
  )
}

export default Navbar