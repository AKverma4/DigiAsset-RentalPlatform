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
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 16 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ₹{item.rentalPrice}/day</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mr: 2 }}>₹{item.rentalPrice * item.quantity}</Typography>
              <IconButton onClick={() => removeFromCart(item.name)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography variant="h5">Total: ₹{totalPrice}</Typography>
            <Box>
              <Button variant="outlined" color="error" onClick={clearCart} sx={{ mr: 2 }}>
                Clear Cart
              </Button>
              <Button variant="contained" color="primary">
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
