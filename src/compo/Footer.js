import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f8f9fa', padding: '10px 0', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #ccc' }}>
      <Button onClick={() => navigate('/home')} color="orange">
        <HomeIcon />
      </Button>
      <Button onClick={() => navigate('/good-receiver')} color="orange">
        <ReceiptIcon />
      </Button>
      <Button onClick={() => navigate('/customer')} color="orange">
        <PersonIcon />
      </Button>
      <Button onClick={() => navigate('/')} color="secondary">
        <ExitToAppIcon />
      </Button>
    </footer>
  );
}

export default Footer;
