import { Card, CardMedia, CardContent, Typography, Box, Container, Divider, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Importing images directly
import cameraImage from 'src/assets/camera.png';
import droneImage from 'src/assets/images/drone.png';
import printerImage from 'src/assets/printer.png';
import cameraLensImage from 'src/assets/images/cameralens.png';

const EquipmentCard = () => {
  const navigate = useNavigate();

  const equipmentData = [
    {
      id: 1,
      title: 'Cameras',
      address: 'Panasonic LUMIX G7 16.00 MP 4K',
      beds: '3x Optical Zoom',
      price: 'Rs 3500 per day',
      image: cameraImage,
    },
    {
      id: 2,
      title: 'Drones',
      address: 'Capture Drone-With-Camera-4k-1080P-HD',
      beds: 'GPS-Auto-Return-One-Touch-Take-OFF',
      price: 'Rs 2500 per day',
      image: droneImage,
    },
    {
      id: 3,
      title: 'Printers',
      address: 'Canon PIXMA MegaTank G3000',
      beds: 'Inktank Colour Printer with Ink Bottles',
      price: 'Rs 1800 per day',
      image: printerImage,
    },
    {
      id: 4,
      title: 'Camera Lens',
      address: 'Fujinon XF18mmF1.4 R LM WR Prime',
      beds: 'Aperture Ring, Linear Motor, Weather Resistance',
      price: 'Rs 5500 per day',
      image: cameraLensImage,
    }
  ];

  const handleViewDetails = (id) => {
    // Navigate to the equipment details page with the selected equipment id
    navigate(`/equipment/${id}`);
  };

  return (
    <Container sx={{ maxWidth: '100%' }}>
      <Typography variant="h4" align="center" mt={4} gutterBottom>
        Our Top Equipment Collection
      </Typography>

      <Grid container spacing={3} justifyContent="center" mt={4} p={2}>
        {equipmentData.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
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
              <Card sx={{ width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Divider sx={{ my: 0.5 }} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.address}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.beds}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.price}</Typography>

                  <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(item.id)}
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EquipmentCard;
