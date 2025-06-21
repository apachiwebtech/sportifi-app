import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

function StockReport() {

  const products = [
    { id: 1, name: 'STANDAR F HbA1c', description: 'Description of Product A', quantity: 19, consumer: 0 },
    { id: 2, name: 'STANDAR F CRP', description: 'Description of Product B', quantity: 29, consumer: 0 },
    { id: 3, name: 'STANDAR F STREP A Ag FIA', description: 'Description of Product C', quantity: 15, consumer: 0 }

  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Stock Report</h1>
        <TextField
          label="Search Product"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '4px' }}
        />
        <TableContainer component={Paper} sx={{ borderRadius: '8px', overflowY: 'auto', maxHeight: '400px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#000', fontWeight: 'bold', width: 250 }}>Product Name</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 'bold', width: 250 }}>Batch Number</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 'bold', width: 250 }}>Quantity</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 'bold', width: 250 }}>Consumer</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 'bold', width: 250 }}>Pending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell style={{ width: 250 }}>{product.name}</TableCell>
                  <TableCell style={{ width: 250 }}>Batch {product.id}</TableCell>
                  <TableCell style={{ width: 250 }}>{product.quantity}</TableCell>
                  <TableCell style={{ width: 250 }}>{product.consumer}</TableCell>
                  <TableCell style={{ width: 250 }}>{product.quantity - product.consumer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </div>
  );
}

export default StockReport;
