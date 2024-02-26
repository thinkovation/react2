// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import QueryPage from './QueryPage';
import DataGridPage from './dataGridPage';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import QueryUsersPage from './QueryUsers';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    // Perform logout logic here, and if successful, set isLoggedIn to false
    setIsLoggedIn(false);
    // Clear any user data or tokens from local storage
    localStorage.removeItem('accessToken');
  };
  const handleLogin = () => {
    // Perform login logic here, and if successful, set isLoggedIn to true
    alert("App.js handle login called");
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <Button component={Link} to="/login" color="inherit" onClick={isLoggedIn ? handleLogout : null}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
            <Button component={Link} to="/query" color="inherit" disabled={!isLoggedIn}>Query</Button>
            <Button component={Link} to="/admin" color="inherit" disabled={!isLoggedIn}>Admin</Button>
            <Button component={Link} to="/mywork" color="inherit" disabled={!isLoggedIn}>My Work</Button>
            <Button component={Link} to="/users" color="inherit" disabled={!isLoggedIn}>List Users</Button>
            <Button component={Link} to="/data" color="inherit" disabled={!isLoggedIn}>Data Grid</Button>
          </Toolbar>
        </AppBar>
      <Routes>
        <Route path="/" exact element={   <LoginPage onLogin={handleLogin} />} />
        <Route path="/login" element={   <LoginPage onLogin={handleLogin} />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/users" element={<QueryUsersPage />} />
        <Route path="/data" element={<DataGridPage />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
