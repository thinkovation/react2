import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function DataGridPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const apiKey = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3030/userdata`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
  
      setData(response.data.data);
      setError('');
    } catch (error) {
      setError('Error fetching data');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },

  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Data Grid Page
      </Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <div style={{ height: "80vh", width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}

export default DataGridPage;
