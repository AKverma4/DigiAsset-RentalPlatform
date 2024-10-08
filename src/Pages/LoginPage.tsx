import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon } from '@mui/icons-material';
import image from '../assets/camera.jpg';
import { useNavigate } from 'react-router-dom';


const LoginContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0ff',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: 'none',
  border: '1px solid #e0e0e0',
  display: 'flex',
  width: '1000px',
  height: '600px',
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
}));

const GraphicSection = styled(Box)(() => ({
  width: '50%',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const PurpleButton = styled(Button)(() => ({
  backgroundColor: '#0070f3',
  color: 'white',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically call your authentication API
    console.log('Login submitted:', { email, password, rememberMe });
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // If login is successful, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (show message to user, etc.)
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In clicked');
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginPaper elevation={6}>
        <FormSection>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Welcome back!
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Enter to get unlimited access to data & information.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link href="#" variant="body2" color="#6c63ff">
                Forgot your password?
              </Link>
            </Grid>
            <PurpleButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </PurpleButton>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              Sign up with Google
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Link href="#" color="#6c63ff">
                Register here
              </Link>
            </Typography>
          </Box>
        </FormSection>
        <GraphicSection />
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;
