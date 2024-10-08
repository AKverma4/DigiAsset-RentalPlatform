import React from 'react';
import { 
  Typography, 
  Container, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Box
} from '@mui/material';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
              }>
                <ListItemText 
                  primary={item.name} 
                  secondary={`Quantity:  ₹{item.quantity} -  ₹{(item.price * item.quantity).toFixed(2)}`} 
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Total:  ₹{total.toFixed(2)}
            </Typography>
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
