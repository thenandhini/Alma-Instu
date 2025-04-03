import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/asset1.webp';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo || "/placeholder.svg"} alt="Institute Logo" className="logo-img" />
            <div className="logo-text">
              <h3>Dr B R Ambedkar National Institute of Technology, Jalandhar</h3>
              <h2>Department of Industrial and Production Engineering</h2>
            </div>
          </Link>
        </div>
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/roles" className="nav-link">Roles</Link>
          <Link to="/alumni" className="nav-link">Alumnus</Link>
          <Link to="/faqs" className="nav-link">FAQs</Link>
          {currentUser ? (
            <>
              <Link to="/contribute" className="nav-link contribute-btn">Contribute</Link>
              <div className="user-profile">
                <img 
                  src={currentUser.profilePicture || 'https://via.placeholder.com/40'} 
                  alt="Profile" 
                  className="profile-img"
                  onClick={() => navigate('/profile')}
                />
                <div className="dropdown-menu">
                  <Link to="/profile">Profile</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link login-btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;