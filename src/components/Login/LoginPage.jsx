import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
  const [inputUserId, setInputUserId] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    localStorage.setItem('userId', inputUserId)
    navigate('/') 
  };

  return (
    <div className="login-container"> {/* Updated class name for full screen and centering */}
      <form onSubmit={handleLogin}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          className="login-input" 
          value={inputUserId}
          onChange={(e) => setInputUserId(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button> {/* Optional class name for styling */}
      </form>
    </div>
  )
}

export default LoginPage

