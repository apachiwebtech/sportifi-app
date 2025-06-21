import React, { useState } from 'react';
import Header from './Header';
import { Box, MenuItem, Select, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Customer() {
  const navigate = useNavigate();
  // Function to handle navigation on click
  const handleNavigation = () => {
    navigate('/home');
    console.log('Logo clicked, navigating to home');

  };
  const [selectedProduct, setSelectedProduct] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [consumerQty, setConsumerQty] = useState('1');

  const handleSubmit = () => {
    if (!selectedProduct || !batchNumber) {
      alert('Please fill in all required fields before submitting.');
      return;
    }
    handleNavigation();
  };

  // Product list
  const products = [
    { id: 1, name: 'STANDAR F HbA1c', description: 'Description of Product A', Qty: '19' },
    { id: 2, name: 'STANDAR F CRP', description: 'Description of Product B', Qty: '29' },
    { id: 3, name: 'STANDAR F STREP A Ag FIA', description: 'Description of Product C', Qty: '15' },
  ];

  return (
    <div>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h1>Add Consumer </h1>
        <Select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ marginBottom: '20px' }}
        >
          <MenuItem value="">Select a Product</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        {selectedProduct && (
          <Select
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ marginBottom: '20px' }}
          >
            <MenuItem value="">Select a Batch</MenuItem>
            <MenuItem value="Batch 1">Batch 1</MenuItem>
            <MenuItem value="Batch 2">Batch 2</MenuItem>
            <MenuItem value="Batch 3">Batch 3</MenuItem>
          </Select>
        )}
        {selectedProduct && batchNumber && (
          <>
            <TextField
              label="Consumer Qty"
              variant="outlined"
              fullWidth
              value={consumerQty}
              onChange={(e) => setConsumerQty(e.target.value)}
              required
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
      <Footer />
    </div>
  );
}

export default Customer;
