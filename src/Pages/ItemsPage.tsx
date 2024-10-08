import React from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Container
} from '@mui/material';
import { useCart } from '../contexts/CartContext';

const convertToINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

interface Item {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ItemsPage: React.FC = () => {
  const { addToCart } = useCart();
  const items: Item[] = [
    { id: 1, name: "Item 1", description: "Description for Item 1", imageUrl: "https://via.placeholder.com/150", price: 19.99 },
    { id: 2, name: "Item 2", description: "Description for Item 2", imageUrl: "https://via.placeholder.com/150", price: 29.99 },
    { id: 3, name: "Item 3", description: "Description for Item 3", imageUrl: "https://via.placeholder.com/150", price: 39.99 },
  ];

  const handleAddToCart = (item: Item) => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Items
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ 
              boxShadow: 'none', 
              border: '1px solid #e0e0e0', 
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${item.price.toFixed(2)} 
                  (₹{convertToINR(item.price).toLocaleString()})
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemsPage;
