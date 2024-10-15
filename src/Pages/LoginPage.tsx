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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import image from '../assets/camera.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authentication';
import { useLocation } from 'react-router-dom';

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

const AdminLoginHeader = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
}));

const LoginPage: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginPaper elevation={6}>
        <FormSection>
          <AdminLoginHeader variant="h4" component="h1">
            DigiMart Admin Login
          </AdminLoginHeader>
          <Typography variant="body2" color="textSecondary" paragraph>
            Enter your credentials to access the admin dashboard.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Email"
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
              label="Admin Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                Forgot password?
              </Link>
            </Grid>
            <PurpleButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in to Admin Dashboard
            </PurpleButton>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
          </Box>
        </FormSection>
        <GraphicSection />
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;
