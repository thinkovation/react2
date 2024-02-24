import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, InputAdornment } from '@mui/material';
import axios from 'axios';

function QueryUsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState('');

  const handleQueryUsers = async () => {
    try {
      const apiKey = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:3030/userslist', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setUsersList(response.data);
      setError('');
    } catch (error) {
      setUsersList([]);
      setError('Error fetching user list');
    }
  };

  
  const handleRowClick = (uid) => {
    console.log(`Clicked row with UID: ${uid}`);
  };

  
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Query Users Page
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleQueryUsers(); }}>
        <TextField
          label="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                🔍
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </form>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {usersList.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user,index) => (
                <TableRow key={user.uid} onClick={() => handleRowClick(user.uid)} style={{ cursor: 'pointer', backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5' }}>
               
                  <TableCell>{user.uid}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default QueryUsersPage;
