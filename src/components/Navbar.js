import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * @name Navbar
 * @description displays the navbar and appropriate links
 * @param {*} props logout, userRole, isLogged
 * @returns component
 */
function Navbar({logout, userRole, isLogged}) {

  //const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
  const [user, setUser] = useState("");
  let [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
      setUrl(location.pathname)

      if (sessionStorage.getItem("token") != null) {
        setUser(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])))
        console.log(user);
        console.log(user.roles);
        //console.log(userRole)
      }
  }, [isLogged, location])


  return (
    <nav className={styles.navigation}>
      <h1 className={styles.companyName}>Hotel Bookings</h1>
      <ul className={styles.list}>
      { isLogged && <li className={styles.item}>
        <Link to='/reservations' className={styles.link + (url === '/reservations' ? styles.active : "")}>Reservations</ Link>
      </li>
      }
      { isLogged && user.roles == "manager" &&
      <li className={styles.item}>
        <Link to='/room-types' className={styles.link + (url === '/room-types' ? styles.active : "")}>Room Types</ Link>
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