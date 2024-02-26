// QueryPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';
import axios from 'axios';

function QueryPage() {
  const [searchId, setSearchId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const apiKey = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3030/users/${searchId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      
      setUserData(response.data.data);
      setError('');
    } catch (error) {
      setUserData(null);
      setError('User not found');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Query Page
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="body1">Search by ID:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    🔍
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      {userData && (
        <form>
           <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Typography variant="body1">Employee ID:</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          fullWidth
          margin="normal"
          value={userData.uid}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1">First Name:</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          fullWidth
          margin="normal"
          value={userData.firstname}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1">Last Name:</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          fullWidth
          margin="normal"
          value={userData.lastname}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
        </form>
      )}
      {error && (
        <Typography variant="body1" color="error">{error}</Typography>
      )}
    </Container>
  );
}

export default QueryPage;
