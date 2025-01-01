import { Card, CardMedia, CardContent, Typography, Box, Container, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EquipmentCard = () => {
  const navigate = useNavigate();

  const equipmentData = [
    {
      id: 1,
      title: 'Cameras',
      address: 'Panasonic LUMIX G7 16.00 MP 4K',
      beds: '3x Optical Zoom',
      price: 'Rs- 3500/- per day',
      image: 'src/assets/camera.png',
    },
    {
      id: 2,
      title: 'Drones',
      address: 'Capture Drone-With-Camera-4k-1080P-HD',
      beds: 'GPS-Auto-Return-One-Touch-Take-OFF',
      price: 'Rs-2500/- per day',
      image: 'src/assets/images/drone.png',
    },
    {
      id: 3,
      title: 'Printers',
      address: 'Canon PIXMA MegaTank G3000 ',
      beds: 'Inktank Colour Printer with Ink Bottles',
      price: 'Rs-1800/- per day',
      image: 'src/assets/printer.png',
    },
    {
      id: 4,
      title: 'Camera Lens',
      address: 'Fujinon XF18mmF1.4 R LM WR Prime',
      beds: 'Aperture Ring, Linear Motor, Weather Resistance',
      price: 'Rs-5500/- per day',
      image: 'src/assets/images/cameralens.png',
    }
  ];

  const handleViewDetails = (id) => {
    // Navigate to the equipment details page with the selected equipment id
    navigate(`/equipment/${id}`);
  };

  return (
    <Container style={{ maxWidth: '100%' }}>
      <Typography variant="h4" align="center" mt={4} gutterBottom>
        Our Top Equipment Collection
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mt={4} p={2}>
        {equipmentData.map((item, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: '20%',
              maxWidth: '400px',
              minWidth: '350px',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              },
            }}
          >
            <Card style={{ width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <Divider sx={{ my: 0.5 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.address}</Typography>
                <Typography variant="body2" color="text.secondary">{item.beds}</Typography>
                <Typography variant="body2" color="text.secondary">{item.price}</Typography>

                {/* Box wrapper for right alignment */}
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(item.id)}
                    sx={{ padding: '4px 8px' }}
                    size="small"
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default EquipmentCard;
