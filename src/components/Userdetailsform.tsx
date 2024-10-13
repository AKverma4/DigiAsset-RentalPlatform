import React, { useState } from 'react';
import { Box, TextField, Typography, Container, Paper, Button } from '@mui/material';

const UserDetailForm = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details Submitted:', userDetails);
  };

  return (
    <Container>
      <Paper elevation={6} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" mb={3} sx={{ fontWeight: 'bold', color: '#333' }}>
          Basic Details Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {/* First Name */}
            <TextField
              name="firstName"
              label="First Name"
              value={userDetails.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              InputProps={{
                style: {
                  fontSize: '18px',
                  borderRadius: '8px',
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 } }}
            />

            {/* Last Name */}
            <TextField
              name="lastName"
              label="Last Name"
              value={userDetails.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              InputProps={{
                style: {
                  fontSize: '18px',
                  borderRadius: '8px',
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 } }}
            />

            {/* Email */}
            <TextField
              name="email"
              label="Email"
              type="email"
              value={userDetails.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              InputProps={{
                style: {
                  fontSize: '18px',
                  borderRadius: '8px',
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 } }}
            />

            {/* Phone Number */}
            <TextField
              name="phone"
              label="Phone Number"
              value={userDetails.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              InputProps={{
                style: {
                  fontSize: '18px',
                  borderRadius: '8px',
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 } }}
            />

            {/* Address */}
            <TextField
              name="address"
              label="Address"
              value={userDetails.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              required
              InputProps={{
                style: {
                  fontSize: '18px',
                  borderRadius: '8px',
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 8 } }}
            />

            {/* Submit Button */}
            {/* <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                padding: '10px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Button> */}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UserDetailForm;
