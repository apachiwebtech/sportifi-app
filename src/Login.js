import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './img/image.png';
import axios from 'axios';
import { Main_URL } from './Base_url';


function Login() {
    const navigate = useNavigate();

    // add usestate for form handling if needed
    const [formdata, setformdata] = React.useState(
        {
            Username: '',
            Password: ''
        }
    );

    //make the functio for store the form data onchnages
    const handleChange = (event) => {
        const { name, value } = event.target;
        setformdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // add a function to handle form submission if needed
    const handleSubmit = (event) => {
        // alert("Form submitted");
        event.preventDefault();
        if (!formdata.Username || !formdata.Password) {
            alert("Please fill in all fields");
            return;
        }
        // Handle login logic here
        axios.post(`${Main_URL}?login=1`, formdata)
            .then((response) => {
                // Handle successful login
                const data  = response.data.data;
                if(data.status == '0'){
                    alert('Invalid credentials!');
                }
                const userid = data.user_id;
                const name  = data.name;
                const email  = data.email;
                const address  = data.address;
                const id = data.id;
                localStorage.setItem('userid', userid);
                localStorage.setItem('username', name);
                localStorage.setItem('email', email);
                localStorage.setItem('address', address);
                localStorage.setItem('id', id);
                // alert('Login successful!');
                navigate('/home'); // Redirect to home page on successful login
                // Optionally, you can redirect the user to another page after login

            })
            .catch((error) => {
                // Handle login error
                alert('Invalid credentials, please try again.');
            });

    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ height: '30%', backgroundColor: 'orange', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={logo} width={300} alt="Logo" />
            </Box>
            <Box sx={{ height: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
                <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Username" name="Username" value={formdata.Username} onChange={handleChange} variant="outlined" fullWidth />
                    <TextField label="Password" name="Password" value={formdata.Password} type="password" onChange={handleChange} variant="outlined" fullWidth />
                    <Button variant="contained" onClick={handleSubmit} color="primary" fullWidth>Login</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
