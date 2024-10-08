import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface EquipmentDetailModalProps {
  open: boolean;
  onClose: () => void;
  equipment: Equipment | null;
}

interface Equipment {
  name: string;
  category: string;
  condition: string;
  rentalPrice: number;
  image: string;
  description: string;
  depositAmount: string;
  availabilityDates: string;
  manufacturer: string;
  location: string;
  contactInfo: string;
}

const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({ open, onClose, equipment }) => {
  if (!equipment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxWidth: '90%',
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflowY: 'auto',
      }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {equipment.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: '0 0 40%' }}>
            <img 
              src={equipment.image} 
              alt={equipment.name} 
              style={{ 
                width: '100%', 
                borderRadius: 8,
                transition: 'transform 0.3s',
                transform: 'rotateY(0)',
                // '&:hover': {
                //   transform: 'rotateY(5deg) scale(1.05)',
                // },
                boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
              }} 
            />
          </Box>
          <Box sx={{ flex: '1 1 60%' }}>
            <Typography variant="body1" gutterBottom><strong>Category:</strong> {equipment.category}</Typography>
            <Typography variant="body1" gutterBottom><strong>Condition:</strong> {equipment.condition}</Typography>
            <Typography variant="body1" gutterBottom><strong>Rental Price:</strong> ₹{equipment.rentalPrice}/day</Typography>
            <Typography variant="body1" gutterBottom><strong>Deposit Amount:</strong> ₹{equipment.depositAmount}</Typography>
            <Typography variant="body1" gutterBottom><strong>Availability Dates:</strong> {equipment.availabilityDates}</Typography>
            <Typography variant="body1" gutterBottom><strong>Manufacturer/Brand:</strong> {equipment.manufacturer}</Typography>
            <Typography variant="body1" gutterBottom><strong>Location:</strong> {equipment.location}</Typography>
            <Typography variant="body1" gutterBottom><strong>Contact Information:</strong> {equipment.contactInfo}</Typography>
            <Typography variant="body1" gutterBottom><strong>Description:</strong> {equipment.description}</Typography>
          </Box>
        </Box>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default EquipmentDetailModal;
