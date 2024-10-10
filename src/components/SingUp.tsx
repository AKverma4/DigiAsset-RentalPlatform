import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import SignupPageImage from '../assets/images/Signup-Page-Image.jpg'; // Adjust the path according to your file structure

const SignUp: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate sign-up logic
    alert("Sign-up successful!");
  };

  return (
    <Box 
      display="flex" 
      height="100vh" 
      bgcolor="#f0f0f5"
      flexDirection={{ xs: 'column', md: 'row' }}
    >
      {/* Left Side: Sign-Up Form */}
      <Box 
        flex={1} // Set to 1 for equal space
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        padding="2rem"
      >
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h4" gutterBottom align="center" marginTop={2} marginBottom={4}>
            SignUp
          </Typography>

          <Stack spacing={2}>
            {/* Full Name */} 
            <TextField label="Full Name" variant="outlined" fullWidth required />

            {/* Email */}
            <TextField label="Email" variant="outlined" fullWidth required />

            {/* Country Code & Mobile Number */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Country Code"
                variant="outlined"
                fullWidth
                required
                defaultValue="+91" // Example prefilled value
                sx={{ flex: '0.3' }} 
              />
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                required
                sx={{ flex: '0.7' }}
              />
            </Stack>

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Sign Up Button */}
            <Button variant="contained" color="primary" fullWidth type="submit">
              Sign Up
            </Button>

            {/* Already have an account? */}
            <Typography align="center" variant="body2">
              Already have an account?{' '}
              <a href="/login" style={{ color: '#1976d2' }}>Log In</a>
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Right Side: Visual Content */}
      <Box 
        flex={1} // Set to 1 for equal space
        display="flex" 
        justifyContent="center" 
        alignItems="center"
      >
        {/* Photo on the right side */}
        <img
          src={SignupPageImage} // Replace with your image URL
          alt="Visual Representation"
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // Adjust the image to cover the area
            borderRadius: '8px', // Optional: add rounded corners
          }}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
