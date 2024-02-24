// QueryPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function QueryPage() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');

  const handleQuery = async (e) => {
    e.preventDefault();
    try {
      const apiKey = localStorage.getItem('accessToken');
      
      const response = await axios.get(`http://localhost:3030/users/${name}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setUserData(response.data);
      console.log(response.data);
      console.log(userData);
      setError('');
    } catch (error) {
      setUserData(null);
      setError('User not found');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Query Page
      </Typography>
      <form onSubmit={handleQuery}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Query
        </Button>
      </form>
      {userData && (
        <div>
          <Typography variant="h5">User Data:</Typography>
          <Typography variant="body1">First Name: {userData.firstname}</Typography>
          <Typography variant="body1">Last Name: {userData.lastname}</Typography>
          <Typography variant="body1">Employee ID: {userData.uid}</Typography>
          {/* Add other user data fields as needed */}
        </div>
      )}
      {error && (
        <Typography variant="body1" color="error">{error}</Typography>
      )}
    </Container>
  );
}

export default QueryPage;