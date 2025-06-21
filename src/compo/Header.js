import  {React, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../img/image.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  // Function to handle navigation on click
  const handleNavigation = () => {
    navigate('/home');
    console.log('Logo clicked, navigating to home');

  };

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  const location = window.location.pathname;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
      <Toolbar>
        <img src={logo} onClick={handleNavigation} alt="Logo" style={{ height: '45px', marginRight: '10px' }} />
        <span style={{ flexGrow: 1 }} />
        {location !== '/home' && (
          <IconButton
            onClick={handleNavigation}
            sx={{ marginRight: '16px' }}
            aria-label="Back"
            color="inherit"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
