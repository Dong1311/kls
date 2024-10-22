import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './Header.css';
import logo from '../../assets/images/logo-bo-cong-an.jpg';

const Header = () => {
  return (
    <header className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="Logo" className="logo-img" />
        A06 - BỘ CÔNG AN
      </Link>
      <div className="header-right">
        <span className="username">Adminkls</span>
        <span className="notification">🔔</span>
      </div>
    </header>
  );
};

export default Header;
