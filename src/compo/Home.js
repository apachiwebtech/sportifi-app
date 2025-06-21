import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Inventory, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Box >
        <Card sx={{ backgroundColor: '#fff', padding: '2px', textAlign: 'left', fontWeight: 'bold' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {localStorage.getItem('username')}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box className="container mt-5" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
        <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/good-receiver')}>
          <CardContent>
            <Inventory sx={{ fontSize: 40, color: 'orange' }} />
            <Typography variant="h6">Stock In</Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/customer')}>
          <CardContent>
            <Person sx={{ fontSize: 40, color: 'orange' }} />
            <Typography variant="h6">Consumer</Typography>
          </CardContent>
        </Card>
        <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/stock-report')}>
          <CardContent>
            <Inventory sx={{ fontSize: 40, color: 'orange' }} />
            <Typography variant="h6">Stock Report</Typography>
          </CardContent>
        </Card>

      </Box>
      <Footer />
    </div >
  );
}

export default Home;
