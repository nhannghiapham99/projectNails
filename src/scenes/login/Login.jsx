// src/Login.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import { API_URL } from "../../theme";
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      // Send a POST request to your backend API with the username and password
      const response = await fetch(`${API_URL}/auth/login-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify that we are sending JSON
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials or server error');
      }

      // Parse the JSON response
      const data = await response.json();

      // Check if token is present in the response
      if (data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('jwtToken', data.token);

        // Redirect to the dashboard or another page after successful login
        window.location.href = "/App";
      } else {
        setError('Invalid credentials or server error');
      }
    } catch (error) {
      setError(error.message); // Show error message if something goes wrong
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <a href="/">Sign Up</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
