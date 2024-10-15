import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import EquipmentList from '../../components/EquipmentList';
import image1 from '../../assets/image.png';
import image2 from '../../assets/camera.jpg';
// import image3 from '../../assets/image3.png';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail);
    };

    window.addEventListener('search', handleSearch as EventListener);

    return () => {
      window.removeEventListener('search', handleSearch as EventListener);
    };
  }, []);

  const carouselItems = [
    {
      name: "Professional Equipment",
      description: "High-quality tools for your projects",
      image: image1
    },
    {
      name: "Reliable Service",
      description: "24/7 support and maintenance",
      image: image2
    },
    {
      name: "Flexible Rentals",
      description: "Short-term and long-term options available",
      image: "https://imgs.search.brave.com/nSwWUKXCQZY2774FStVSykRV7ghxaxm8vn-5BNRZvVE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2UzLzU1/L2RlL2UzNTVkZTUy/OTU4ZDlmNGZhMGVi/MjkyOWU5MmM5MGMy/LmpwZw"
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Equipment Rental
        </Typography>
        
        <Carousel>
          {carouselItems.map((item, index) => (
            <Paper key={index} elevation={3} sx={{
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <Box sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white' }}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography>{item.description}</Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
          Available Equipment
        </Typography>
        <EquipmentList searchTerm={searchTerm} showMoreOptions={false} />
      </Box>
    </Container>
  );
};

export default Home;
