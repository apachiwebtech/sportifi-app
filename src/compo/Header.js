import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  const location = window.location.pathname;

  // Separate handler for logo
  const handleLogoClick = () => {
    navigate('/home');
  };

  // Back button goes to previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#5f6ffa', top: 0, zIndex: 1100 }}>
      <Toolbar>
        <img
          src={logo}
          onClick={handleLogoClick}
          alt="Logo"
          style={{ height: '45px', marginRight: '10px', cursor: 'pointer' }}
        />
        <span style={{ flexGrow: 1 }} />
        {location !== '/home' && (
          <IconButton
            onClick={handleBack}
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
