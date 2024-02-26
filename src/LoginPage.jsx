// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function LoginPage({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Handle Login");
    try {
      const response = await axios.post('http://localhost:3030/login', {
        username,
        password,
      });
      const payload = response.data;
      // Assuming the response contains user data and an access token
     
      const { data } = payload;
      const {user} = data;
      console.log(user);
    const { firstname, lastname, apikey } = user;
      console.log(firstname + " " + lastname);
      
      // Store the access token in local storage for future requests
      console.log(apikey);
      localStorage.setItem('accessToken', apikey);
      // Redirect to the query page or any other page you want
      onLogin()
      navigate('/query');
    } catch (error) {
        ;
      console.error('Login failed:', error.message);
      // Handle login failure, e.g., show error message to user
    }
  };

  return (
    
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Login Page
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Container>
      );
    }
  


export default LoginPage;
