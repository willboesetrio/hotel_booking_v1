import React from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.navigation}>
      <h1 className={styles.companyName}>Hotel Bookings</h1>
      <ul className={styles.list}>
        {/*update: WE DO NOT actually need a link to login in the navbar,
        if a user is not logged in they may only access the login page,
        once logged in, they can only access the login page upon clicking LOG OUT,
        successful login redirects to login page,
        logout clears the user from the current state and session storage and redirects to login page*/}
      <li className={styles.item}>
        <Link to='/' className={styles.link}>Login</ Link>
      </li>
      <li className={styles.item}>
        <Link to='/reservations' className={styles.link}>Reservations</ Link>
      </li>
      <li className={styles.item}>
        <Link to='/room-types' className={styles.link}>Room Types</ Link>
      </li>
      <li className={styles.item}>
        Log Out
      </li>
      </ul>
    </nav>
  )
}

export default Navbar