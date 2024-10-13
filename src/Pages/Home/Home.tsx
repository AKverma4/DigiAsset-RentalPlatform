import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import EquipmentList from '../../components/EquipmentList';
import EquipmentCard from '../../components/Equipment-card';


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

  return (
    <Container maxWidth="lg" >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Equipment Rental
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Available Equipment
        </Typography>
        <EquipmentList searchTerm={searchTerm} showMoreOptions={false} />
        <EquipmentCard />
      </Box>
    </Container>
  );
};

export default Home;
