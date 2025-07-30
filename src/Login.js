import React, { useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import logo from './img/image.png';
import logo from './img/logo.png'
import axios from 'axios';
import { Main_URL } from './Base_url';


function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      navigate('/home');
    }
  }, [navigate]);

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
    axios.post(`${Main_URL}?login=1`, formdata, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then((response) => {
        // Handle successful login
        const data = response.data.data;
        // if(data.status == '0'){
        //     alert('Invalid credentials!');
        // }
        const userid = data.user_id;
        const name = data.referee_fname + ' ' + data.referee_mname + ' ' + data.referee_lname;
        const email = data.referee_email;
        const id = data.id;
        localStorage.setItem('userid', userid);
        localStorage.setItem('username', name);
        localStorage.setItem('email', email);
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
      <Box sx={{ height: '25%', backgroundColor: '#5f6ffa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={logo}
          width={250} alt="Logo" />
      </Box>
      <Box sx={{ height: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', backgroundColor: '#f5f6ff' }}>
        <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" name="Username" value={formdata.Username} onChange={handleChange} variant="outlined" fullWidth />
          <TextField label="Password" name="Password" value={formdata.Password} type="password" onChange={handleChange} variant="outlined" fullWidth />
          <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <Button variant="contained" onClick={handleSubmit} color="primary" fullWidth style={{ width: "250px" }}>Login</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
