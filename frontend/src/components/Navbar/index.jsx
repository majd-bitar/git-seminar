import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGitAlt, FaGithub, FaMoon, FaSun } from 'react-icons/fa';
import styles from './styles.module.css';
import { Slide, toast } from 'react-toastify';
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);



  const handleThemeClick = () => {
    toast.warn("< DON'T CALL YOURSELF A PROGRAMMER IF YOU USE LIGHT MODE ON ANYTHING! />", {
      position: "top-center",
      autoClose: 2000, // ✅ Toast will disappear automatically
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      className: styles.customToast,
      transition: Slide,
      closeButton: false, // ✅ This removes the "X" close button
    });
  };

  
  

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Git Seminar</div>
      <div className={styles.iconsContainer}>
        <Link to="/home" className={styles.navIcon}>
          <FaGitAlt className={styles.gitIcon} />
        </Link>
        <Link to="/home" className={styles.navIcon}>
          <FaGithub className={styles.githubIcon} />
        </Link>
      </div>
      {/* Right-aligned Moon Icon */}
      <button className={styles.themeToggle} onClick={handleThemeClick}>
        <FaMoon className={styles.themeIcon} />
      </button> 
    </nav>
  );
}
