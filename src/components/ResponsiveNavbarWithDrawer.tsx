import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

// Search Bar styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px', // Keep this for rounded corners
  backgroundColor: '#f8f9fa', // Set background color to off-white
  '&:hover': {
    backgroundColor: '#e2e6ea', // Slightly darker on hover
  },
  marginLeft: 0,
  width: '100%',
  border: `1px solid #1976d2`, // Ensure the border color matches your design
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// Search Icon Wrapper styling
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1976d2',
}));

// Styled Input Base with placeholder color
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000', // Set the text color (change this to your desired color)
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: '100%',
  },
  '&::placeholder': {
    color: '#A9A9A9', // Change this to your desired placeholder color (e.g., light gray)
    opacity: 1, // Show the placeholder fully
  },
}));


// Drawer Header styling
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface ResponsiveNavbarWithDrawerProps {
  children: React.ReactNode;
  onSearch: (searchTerm: string) => void;
}

export default function ResponsiveNavbarWithDrawer({ children, onSearch }: ResponsiveNavbarWithDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { cart } = useCart();

  // Handle drawer open and close
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Handle page navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
    window.dispatchEvent(new CustomEvent('search', { detail: newSearchTerm }));
  };

  // Handle avatar menu
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  // List of drawer menu items
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Login', path: '/login' },
    { text: 'Categories', path: '/categories' },
    { text: 'Order Delivery', path: '/order-delivery' },
    { text: 'Insurance and Policy', path: '/insuranceandpolicy' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* AppBar Section */}
      <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: 'black',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'black', fontSize: '2.0rem'}}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              DigiMart
            </Link>
          </Typography>
          
          {/* Search Bar Section */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Equipment"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          
          {/* Cart and Avatar Icons */}
          <IconButton color="inherit" aria-label="cart" onClick={() => navigate('/cart')} sx={{ ml: 2, color: 'black' }}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleAvatarClick} sx={{ ml: 1, color: 'black', p: 0 }}>
  <Avatar 
    sx={{
      width: 32,
      height: 32,
      bgcolor: '#grey.500',
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)' // Adjusts the ring thickness and color
    }}
  >
    A
  </Avatar>
</IconButton>

          {/* Avatar Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <PersonIcon fontSize="small" sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#1976d2' }}>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <LoginIcon fontSize="small" sx={{ color: '#388e3c' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#388e3c' }}>Login</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" sx={{ color: '#f57c00' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#f57c00' }}>Settings</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Drawer Section */}
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRight: 'none',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {/* Drawer Header */}
        <DrawerHeader sx={{ 
          backgroundColor: '#white',
          color: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0, 2),
        }}>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', backgroundColor: '#white' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              DigiMart
            </Link>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: '#1976d2' }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        {/* Drawer Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
