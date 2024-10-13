import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface EquipmentCardProps {
  name: string;
  category: string;
  condition: string;
  rentalPrice: number;
  image: string;
  description: string;
  onDelete: () => void;
  onUpdate: () => void; // Add this new prop
  onView: () => void; // Add this new prop
  showMoreOptions?: boolean; // Add this new prop
  onAddToCart: () => void; // Add this new prop
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ 
  name, 
  // category, 
  // condition, 
  rentalPrice, 
  image, 
  description, 
  onDelete,
  onUpdate,
  onView, // Add this new prop
  showMoreOptions = true, // Add this with a default value of true
  onAddToCart // Add this new prop
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [truncatedDescription, setTruncatedDescription] = useState<string>('');

  useEffect(() => {
    const truncateDescription = (text: string, wordLimit: number) => {
      const words = text.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return text;
    };

    setTruncatedDescription(truncateDescription(description, 30));
  }, [description]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{
      width: '100%',
      height: '100%', // Ensure full height
      display: 'flex',
      flexDirection: 'column',
      // m: 2,
      // gap: 16,
      borderRadius: 2,
      position: 'relative',
      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
      border: '2px solid #32a1ce',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      },
    }}>
      {showMoreOptions && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
          }}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { onUpdate(); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1, color: 'info.main' }} />
          <Typography sx={{ color: 'info.main' }}>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => { onDelete(); handleMenuClose(); }}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          <Typography sx={{ color: '#f44336' }}>Delete</Typography>
        </MenuItem>
      </Menu>
      {image && (
        <div style={{ 
          height: 200, 
          overflow: 'hidden', 
          borderTopLeftRadius: 8, 
          borderTopRightRadius: 8 
          // borderRadius: ,
        }}>
          <img 
            src={image} 
            alt={name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              borderRadius: "10px",
            }} 
          />
        </div>
      )}
      <CardContent sx={{ pt: image ? 2 : 3, pb: 3, position: 'relative' }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary" variant="body2">
          {/* <strong>Category:</strong> {category} */}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary" variant="body2">
          {/* <strong>Condition:</strong> {condition} */}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: '#4caf50', fontWeight: 'bold' }}>
        ₹{rentalPrice}/day
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          display: '-webkit-box', 
          WebkitLineClamp: 4, 
          WebkitBoxOrient: 'vertical',
          color: '#757575',
        }}>
          {truncatedDescription}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onView()}
            sx={{
              minWidth: '60px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            View
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => onAddToCart()}
            startIcon={<AddShoppingCartIcon />}
            sx={{
              minWidth: '60px',
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
