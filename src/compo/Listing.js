import React, { useEffect, useState } from 'react';
import Header from './Header';
import { List, ListItem, ListItemText, Box, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { Main_URL } from '../Base_url';
function Listing() {
    const { id } = useParams();
    const navigate = useNavigate();
        const [productData, setProductData] = useState([]);
    const [receivedQtys, setReceivedQtys] = useState({});
    const [editables, setEditables] = useState({});

    // Function to handle navigation on click
    const handleNavigation = () => {
        navigate(`/home`);
        console.log('Logo clicked, navigating to home');

    };

    const getProducts = () => {
            // Handle login logic here
            axios.post(`${Main_URL}?product=${id}`)
                .then((response) => {
                    setProductData(response.data?.data);
                    console.log('Products:', response.data?.data);
                })
                .catch((error) => {
                    // Handle login error
                    alert('Invalid credentials, please try again.');
                });
        };

        useEffect(() => {
          getProducts();
        }, []);

    // Make all products editable on load
    useEffect(() => {
        if (productData.length > 0) {
            const initialEditables = {};
            productData.forEach((product) => {
                initialEditables[product.id] = true;
            });
            setEditables(initialEditables);
        }
    }, [productData]);


    // Update received quantity with validation
    const handleReceivedQtyChange = (id, value) => {
        const billedQty = productData.find((p) => p.id === id)?.quantity || 0;
        let numValue = Number(value);
        if (numValue > billedQty) {
            numValue = billedQty;
        }
        setReceivedQtys((prev) => ({ ...prev, [id]: numValue }));
    };
    // Save disables editing for a product
    const handleSave = (id) => {
        if (!receivedQtys[id]) {
            alert('Please fill in Received Quantity before saving.');
            return;
        }
        setEditables((prev) => ({ ...prev, [id]: false }));
    };
    // Edit enables editing for a product
    const handleEdit = (id) => {
        setEditables((prev) => ({ ...prev, [id]: true }));
    };
    // Submit checks all products
    const handleSubmit = () => {
        const incomplete = productData.some(
            (product) => !receivedQtys[product.id]
        );
        if (incomplete) {
            alert('Please fill in all required fields before submitting.');
            return;
        }
        // Prepare data for API
        const dispatchData = productData.map((product) => ({
            product_id: product.id,
            cconditions: product.cconditions || '',
            csize: product.csizes || '',
            receivedQty: receivedQtys[product.id],
        }));
        axios.post(`${Main_URL}?savedispatch=1`, { products: dispatchData })
            .then((res) => {
                alert('Dispatch saved successfully!');
                // handleNavigation();
            })
            .catch((err) => {
                alert('Failed to save dispatch.');
            });
    };

    return (
        <div>
            <Header />
           
            <Box sx={{ padding: '10px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}> 
                <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Dispatch Product List (#2487)</h4> 
                <List sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}> 
                    {productData.map((product) => (
                        <ListItem key={product.id} sx={{ borderBottom: '1px solid #eee', padding: '15px 10px', flexDirection: 'column', alignItems: 'flex-start' }}> 
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <ListItemText  primary={product.product_type} primaryTypographyProps={{ fontWeight: 'bold', color: '#555' }} /> 
                                <span style={{ fontSize: '13px', color: '#888' }}>Billed Qty = {product.quantity}</span> 
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%', marginTop: '10px' }}> 
                                <TextField
                                    label="Batch Number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={product.csizes || ''}
                                    disabled
                                    sx={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}
                                />
                                <TextField
                                    label="Received Qty"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="number"
                                    value={receivedQtys[product.id] || ''}
                                    onChange={(e) => handleReceivedQtyChange(product.id, e.target.value)}
                                    disabled={!editables[product.id]}
                                    sx={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}
                                />
                                {editables[product.id] ? (
                                    <button className="btn-save" style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleSave(product.id)}>Save</button>
                                ) : (
                                    <button className="btn-save" style={{ backgroundColor: '#ff9800', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleEdit(product.id)}>Edit</button>
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="btn-submit" style={{ backgroundColor: '#2196f3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSubmit}>Submit</button> 
                </Box>
            </Box>
          
            
            <Footer />
        </div>
    );
}

export default Listing;
