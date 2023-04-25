import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
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

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/register/', {
        username: username,
        email: email,
        password: password,
      });
      setErrorMessage('');
      alert('Registration successful! You can now log in.');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // This line will print the error details
      } else {
        console.log('Error', error.message);
      }
      setErrorMessage('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={useStyles.card}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Register
              </Typography>
              <form onSubmit={handleSubmit} style={useStyles.form}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
                {errorMessage && (
                  <Box mt={2}>
                    <Typography color="error">{errorMessage}</Typography>
                  </Box>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
