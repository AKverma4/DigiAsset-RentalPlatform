import React, { useContext } from 'react';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { CartContext } from '../contexts/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => total + item.rentalPrice * item.quantity, 0);

  return (
    <Container maxWidth="md" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" component="h1" gutterBottom style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Your cart is empty.</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
            {cart.map((item) => (
              <Box key={item.name} sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(50% - 8px)', // Subtracting half of the gap
                mb: 2,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: 'white',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 16, borderRadius: '4px' }} />
                <Typography variant="h6" style={{ color: '#007bff' }}>{item.name}</Typography>
                <Typography style={{ color: '#666' }}>Price: ₹{item.rentalPrice}/day</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => updateQuantity(item.name, item.quantity - 1)} style={{ color: '#007bff' }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }} style={{ fontWeight: 'bold' }}>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.name, item.quantity + 1)} style={{ color: '#007bff' }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" style={{ color: '#28a745' }}>₹{item.rentalPrice * item.quantity}</Typography>
                </Box>
                <Button 
                  onClick={() => removeFromCart(item.name)} 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  sx={{ mt: 2, alignSelf: 'flex-end' }}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
            p: 2,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h5" style={{ color: '#007bff', fontWeight: 'bold' }}>Total: ₹{totalPrice}</Typography>
            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                sx={{
                  mr: 2,
                  '&:hover': {
                    backgroundColor: '#dc3545',
                    color: 'white'
                  }
                }}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  '&:hover': {
                    backgroundColor: '#0056b3'
                  }
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
