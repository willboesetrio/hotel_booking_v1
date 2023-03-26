import React from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.navigation}>
      <h1 className={styles.companyName}>Hotel Bookings</h1>
      <ul className={styles.list}>
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