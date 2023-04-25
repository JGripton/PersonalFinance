import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const useStyles = {
  card: {
    padding: '16px',
    marginTop: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { updateAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      });
      console.log(data);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      updateAuth(true);
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={useStyles.card}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit} style={useStyles.form}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
                {errorMessage && (
                  <Box mt={2}>
                    <Typography color="error">{errorMessage}</Typography>
                  </Box>
                )}
              </form>
            </CardContent>
          </Card>
          <Typography component="a" href='/register' color="primary">
                  Don't have an account? Register here.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
