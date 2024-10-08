import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
  onView // Add this new prop
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
      width: 280,
      m: 2,
      gap: 16,
      borderRadius: 2,
      position: 'relative',
      boxShadow: 'none',
      border: '2px solid #9e9e9e', // Changed this line
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      },
    }}>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { onUpdate(); handleMenuClose(); }}>Update</MenuItem>
        <MenuItem onClick={() => { onDelete(); handleMenuClose(); }}>Delete</MenuItem>
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
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary" variant="body2">
          {/* <strong>Category:</strong> {category} */}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary" variant="body2">
          {/* <strong>Condition:</strong> {condition} */}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
        ₹{rentalPrice}/day
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          display: '-webkit-box', 
          WebkitLineClamp: 4, 
          WebkitBoxOrient: 'vertical',
        }}>
          {truncatedDescription}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onView()}
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            minWidth: '60px',
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
