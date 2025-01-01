import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Button, Box, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EquipmentCardProps {
  name: string;
  rentalPrice: number;
  image: string;
  description: string;
  onDelete: () => void;
  onUpdate: () => void;
  onView: () => void;
  showMoreOptions?: boolean;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  name,
  rentalPrice,
  image,
  description,
  onDelete,
  onUpdate,
  onView,
  showMoreOptions = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [truncatedDescription, setTruncatedDescription] = useState<string>('');

  useEffect(() => {
    const truncateDescription = (text: string, wordLimit: number) => {
      const words = text.split(' ');
      return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : text;
    };

    setTruncatedDescription(truncateDescription(description, 20));
  }, [description]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '400px', // Increase width by setting a max width
        height: 'auto', // Allow height to adjust based on content
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.5s, box-shadow 0.5s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {showMoreOptions && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
            zIndex: 1,
          }}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { onUpdate(); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1, color: 'info.main' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { onDelete(); handleMenuClose(); }}>
          <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>
      <Box sx={{ height: 180, overflow: 'hidden' }}>
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
          }}
        />
      </Box>

      {/* Divider between Image and Name */}
      <Divider sx={{  }} /> {/* This adds space on the top and bottom of the divider */}

      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#black', mb: 1 }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#black', fontWeight: 'medium' }}>
          ₹{rentalPrice}/day
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {truncatedDescription}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onView}
            sx={{
              textTransform: 'none',
              fontWeight: 'normal',
              px: 1.3,
              py: 0.5,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
