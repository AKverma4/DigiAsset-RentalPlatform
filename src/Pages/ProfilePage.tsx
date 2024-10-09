import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import AddEquipmentButton from '../components/AddEquipmentButton';
import EquipmentList from '../components/EquipmentList';

const ProfilePage: React.FC = () => {
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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <AddEquipmentButton />
        <EquipmentList searchTerm={searchTerm} />
      </Box>
    </Container>
  );
};

export default ProfilePage;
