import React, { useState, useEffect } from 'react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { gamerProfile, logout } from '../../redux/actions/gamerAction';

export default function Navbar(props) {
  const gamerState = useSelector((state) => state.gamerReducer);
  const gamer = gamerState.gamer;
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

  useEffect(() => {
    setImageSrc(
      gamer.image
        ? `${process.env.REACT_APP_URL}/api/profile/img/${gamer.image}`
        : 'https://distil.in/demo/snappcoins/img/avatar-user.jpg'
    );
  }, [gamer.image]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleEditProfile = () => {
    dispatch(gamerProfile(gamer));
  };

  useEffect(() => {
    // Set the dark mode state in localStorage
    localStorage.setItem('isDarkMode', isDarkMode);

    // Apply dark mode styles to the root element
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <nav
        style={{ height: '77px'}}
        className={`navbar navbar-expand-lg navbar-light ${
          isDarkMode ? 'dark-mode' : ''
        } ${props.darkMode ? 'dark-mode' : ''}`}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">
              {isDarkMode ? (
                <img
                  src="https://distil.in/demo/snappcoins/img/logo.svg"
                  alt="Logo"
                  width="170"
                  height="35"
                  className="dark"
                  onClick={handleClick}
                />
              ) : (
                <img
                  src="https://distil.in/demo/snappcoins/img/logo-light-mode.svg"
                  alt="Logo"
                  width="170"
                  height="35"
                  className="light"
                  onClick={handleClick}
                />
              )}
            </Link>
          </div>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    fontFamily: "Albert Sans', sans-serif",
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    fontFamily: "Albert Sans', sans-serif",
                  }}
                >
                  Explore
                </a>
              </li>

              <li>
                <div
                  style={{
                    borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                    height: '34px',
                    marginTop: '0.8rem',
                    position: 'absolute',
                    right: '245px',
                  }}
                ></div>
              </li>
            </ul>
            <div className="navbar-divider" style={{ marginTop: '1rem' }}></div>
            <div className="btn text-success mx-2" onClick={handleDarkModeToggle}>
              {isDarkMode ? (
                <LightModeOutlinedIcon
                  style={{
                    color: 'white',
                    marginTop: '0.5rem',
                    backgroundColor: isHovered ? '#48e0a4' : '#201D24',
                    transition: 'background-color 0.3s ease',
                    width: '40px',
                    height: '34px',
                    borderRadius: '3px',
                    padding: '6px', // Added padding to the icon
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ) : (
                <DarkModeOutlinedIcon
                  style={{
                    color: 'black',
                    marginTop: '0.5rem',
                    backgroundColor: isHovered ? '#48e0a4' : '#eee',
                    transition: 'background-color 0.3s ease',
                    width: '40px',
                    height: '34px',
                    borderRadius: '3px',
                    padding: '6px',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              )}
            </div>
            <div className="d-flex justify-content-center">
              <div className="overflow-hidden">
                {/* <!-- Profile picture image--> */}
                {!imageLoaded && <div className="loading-spinner"></div>}
                <img
                  className={`img-account rounded-circle mb-4 ${imageLoaded ? '' : 'hidden'}`}
                  src={imageSrc}
                  alt=""
                  width="30.8px"
                  height="30.8px"
                  borderRadius="50%"
                  marginTop="1rem"
                  top="50%"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                  onClick={handleClick}
                  style={{ marginTop: '2rem', backfaceVisibility: 'hidden' }}
                />
              </div>
            </div>
            <Link className="mx-1" to="/" style={{ color: 'black', marginTop: '-10px' }}>
              Balance
            </Link>
          </div>
        </div>
      </nav>

      {showDropdown && (
        <ul
          className={`dropdown-menu show ${props.darkMode ? 'dark-mode-dropdown' : ''}`}
          style={{
            position: 'fixed',
            top: '60px',
            left: 'calc(75% + 150px)',
            transform: 'translateX(-50%)',
            width: '250px',
            height: '500px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Link to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <figure>
              {/* <!-- Profile picture image--> */}
              {!imageLoaded && <div className="loading-spinner"></div>}
              <img
                className={`img-account rounded-circle mb-4 ${imageLoaded ? '' : 'hidden'}`}
                src={imageSrc}
                alt=""
                height="54.375rem"
                width="54.375rem"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
              />
            </figure>
            <div className="balance" style={{ marginTop: '2rem' }}>
              <h6 className="mb-0">Balance</h6>
              <span>{gamer.walletMoney} snapps</span>
            </div>
          </Link>
          <hr />

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AccountCircleOutlinedIcon fontSize="small" />{' '}
              <span style={{ color: 'inherit' }}>My Profile</span>
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link onClick={handleEditProfile} to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <EditOutlinedIcon fontSize="small" /> <span style={{ color: 'inherit' }}>Edit Profile</span>
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AccountBoxOutlinedIcon fontSize="small" /> <span style={{ color: 'inherit' }}>Account</span>
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/myitems" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ShoppingBagOutlinedIcon fontSize="small" /> <span style={{ color: 'inherit' }}>My Items</span>
            </Link>
          </li>
          <li onClick={handleLogoutClick}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }}>
              <ExitToAppOutlinedIcon fontSize="small" /> <span style={{ color: 'inherit' }}>Log Out</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}