// src/components/NavBar/NavBar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  const handleLogout = () => {
    localStorage.removeItem('userId')  // Clear the user ID from localStorage
    navigate('/');  // Optionally redirect to the home page
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
        Home
      </NavLink>
      <NavLink to="/drinks" className={({ isActive }) => isActive ? "active-link" : ""}>
        All Drinks
      </NavLink>
      <NavLink to="/add-drink" className={({ isActive }) => isActive ? "active-link" : ""}>
        Add New Drink
      </NavLink>
      {userId ? (
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      ) : (
        <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>
          Login
        </NavLink>
      )}
    </nav>
  )
}

export default NavBar;

