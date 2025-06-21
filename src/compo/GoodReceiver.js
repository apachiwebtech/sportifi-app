import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Header from './Header';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { use } from 'react';
import axios from 'axios';
import { Main_URL } from '../Base_url';

function GoodReceiver() {
  const navigate = useNavigate();
  const [dispatchList, setDispatchList] = useState([]);
  // Function to handle navigation on click
  const handleNavigation = (id) => {
    navigate(`/listing/${id}`);
  };

    const getdispatchlist = () => {
        // Handle login logic here
        axios.post(`${Main_URL}?dispatch=1`)
            .then((response) => {
                setDispatchList(response.data.data);
            })
            .catch((error) => {
                // Handle login error
                alert('Invalid credentials, please try again.');
            });
    };

useEffect(() => {
  getdispatchlist();
}, []);

  return (
    <div>
      <Header />
<div className='pb-3 mb-5'>
     { dispatchList.map((item) => (
      <>
       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Card sx={{ width: '400px', paddingTop: '10px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>Dispatch (#{item.dispatch_id})</Typography>
                <Typography variant="h5" sx={{ fontSize: '15px' }}>Qty : {item.qty}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <RemoveRedEyeIcon onClick={() => handleNavigation(item.dispatch_id)} sx={{ fontSize: 45, color: 'orange', marginTop: '20px' }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      </>
     ))}
</div>
      <Footer />
    </div>
  );
}

export default GoodReceiver;
