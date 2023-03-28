import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

//ideally we would reserve our user permissions as props passed down from the main component,
//then conditionally render certain links based on user permissions
function Navbar({logout, userRole}) {

  //const [user, setUser] = useState(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])));
  const [user, setUser] = useState("");
  let [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = () => {
      if (sessionStorage.getItem("token") != null) {
        setUser(JSON.parse(atob(sessionStorage.getItem("token").split('.')[1])))
        console.log(user.role);
        //setUser
      }
    }
  }, [])


  return (
    <nav className={styles.navigation}>
      <h1 className={styles.companyName}>Hotel Bookings</h1>
      <ul className={styles.list}>
        {/*update: WE DO NOT actually need a link to login in the navbar,
        if a user is not logged in they may only access the login page,
        once logged in, they can only access the login page upon clicking LOG OUT,
        successful login redirects to login page,
        logout clears the user from the current state and session storage and redirects to login page*/}
      { userRole == "manager" && <li className={styles.item}>
        <Link to='/reservations' className={styles.link}>Reservations</ Link>
      </li>
      }
      <li className={styles.item}>
        <Link to='/room-types' className={styles.link}>Room Types</ Link>
      </li>
      {/*{role &&*/} 
      <li className={styles.item}>
        <Link to='/' onClick={logout} className={styles.link}>Log Out</ Link>
      </li>
      {/*}*/}
      </ul>
    </nav>
  )
}

export default Navbar