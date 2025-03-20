import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/images/logo-bo-cong-an.jpg'
import { UserContext } from '../../context/UserContext' // Import UserContext

const Header = () => {
  const { name } = useContext(UserContext) // Lấy thông tin name từ UserContext

  return (
    <header className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="Logo" className="logo-img" />
        A06 - BỘ CÔNG AN
      </Link>
      <div className="header-right">
        <span className="username">{name || 'Guest'}</span> {/* Hiển thị name */}
        <span className="notification">🔔</span>
      </div>
    </header>
  )
}

export default Header
