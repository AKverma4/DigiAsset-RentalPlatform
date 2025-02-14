import { useParams } from 'react-router-dom';
import { Card, CardMedia, Typography, Container, Box, Button, Grid, IconButton,  } from '@mui/material';
import { useState } from 'react';
import { Rating } from '@mui/material';
import cameraImage from '../assets/images/camera.png';
import droneImage from '../assets/images/drone.png';
import printerImage from '../assets/images/printer.png';
import cameralsImage from '../assets/images/cameralens.png';
import { Divider } from 'theme-ui';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Call, Message } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import RateReviewIcon from '@mui/icons-material/RateReview';


const EquipmentDetail = () => {
  const { id } = useParams();

 const equipmentData = [
 {
    id: 1,
    title: 'Cameras',
    address: 'Panasonic LUMIX G7 16.00 MP 4K',
    beds: '3x Optical Zoom',
    price: 3500,
    description: 'Panasonic LUMIX G7 16.00 MP 4K Mirrorless Interchangeable Lens Camera Kit with 14-42 mm Lens (Black) with 3x Optical Zoom.',
    images: [cameraImage, droneImage, printerImage, cameralsImage],
    owner: {
      name: 'Samuel Green',
      contact: '+91 98765 43210', // Updated to a phone number
      email: 'samuel@example.com', // Added email field
      profilePhoto: 'https://example.com/profile-photo.jpg',
      address: 'Mumbai, Maharashtra, India.'
    },
    reviews: [
      { user: 'Alice', review: 'Great camera for videos!' },
      { user: 'Bob', review: 'Excellent quality and easy to use.' }
    ]
  },
  {
    id: 2,
    title: 'Drones',
    address: 'Capture Drone-With-Camera-4k-1080P-HD',
    beds: 'GPS-Auto-Return-One-Touch-Take-OFF',
    price: 2500,
    description: 'A professional drone with HD camera capabilities.',
    images: [droneImage, cameraImage, printerImage, cameralsImage],
    owner: {
      name: 'Sameer Maheswari',
      contact: '+91 93215 45810', // Updated to a phone number
      email: 'sam@example.com', // Added email field
      profilePhoto: 'https://example.com/profile-photo.jpg',
      address: 'Mumbai, Maharashtra, India.'
    },
    reviews: [
      { user: 'Charlie', review: 'Amazing flight stability and great camera quality!' },
      { user: 'Dave', review: 'Perfect for aerial shots.' }
    ]
  },
  {
    id: 3,
    title: 'Printers',
    address: 'HP LaserJet Pro M404n',
    beds: 'Automatic Duplex Printing',
    price: 1200,
    description: 'HP LaserJet Pro M404n is a monochrome laser printer with automatic duplex printing and a fast printing speed.',
    images: [printerImage, cameraImage, droneImage, cameralsImage],
    owner: {
      name: 'Anirudh Singh',
      contact: '+91 58964 36987', // Updated to a phone number
      email: 'ani@example.com', // Added email field
      profilePhoto: 'https://example.com/profile-photo.jpg',
      address: 'Mumbai, Maharashtra, India.'
    },
    reviews: [
      { user: 'Eve', review: 'Fast printing with good quality.' },
      { user: 'Frank', review: 'Efficient and reliable printer for small offices.' }
    ]
  },
  {
    id: 4,
    title: 'Laptops',
    address: 'Apple MacBook Pro 13"',
    beds: '16GB RAM-512GB SSD',
    price: 2200,
    description: 'Apple MacBook Pro 13" with 16GB RAM and 512GB SSD, perfect for designers, developers, and content creators.',
    images: [ droneImage, cameraImage, printerImage],
    owner: {
      name: 'Simran Thakur',
      contact: '+91 98687 25896', // Updated to a phone number
      email: 'simramthkur@example.com', // Added email field
      profilePhoto: 'https://example.com/profile-photo.jpg',
      address: 'Mumbai, Maharashtra, India.'
    },
    reviews: [
      { user: 'George', review: 'Super fast and beautiful display!' },
      { user: 'Hannah', review: 'Great for development and media work.' }
    ]
  },
  
];



  const equipment = equipmentData.find(item => item.id === parseInt(id));

  const [mainImage, setMainImage] = useState(equipment?.images[0]);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [days, setDays] = useState(1); // Number of days selected
  const handleDecrease = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  const handleIncrease = () => {
    setDays(days + 1);
  };

  const totalRent = (equipment?.price || 0) * days; // Updated to use price and days correctly
  

  if (!equipment) {
    return <Typography variant="h6" align="center">Equipment not found</Typography>;
  }  

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia component="img" height="400" image={mainImage} alt={equipment.title}
              sx={{  objectFit: 'cover', borderRadius: 2,boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',border: '1px solid rgba(224, 224, 224, 1)',
                marginLeft: '8px', marginTop: '8px', }}/>
            <Box sx={{ position: 'absolute', top: '50%', left: '-120px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 1, }}>
              {equipment.images.map((image, index) => (
                <IconButton key={index} onClick={() => setMainImage(image)} sx={{ p: 1 }}>
                  <CardMedia component="img" width="80" height="80" image={image} alt={`Thumbnail ${index}`}
                    sx={{ borderRadius: 2, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(224, 224, 224, 1)', }} />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Equipment Info Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }}>
              {equipment.description}
            </Typography>
            <Rating name="equipment-rating" value={4.5} precision={0.5} readOnly sx={{ mb: 2 }} />
            <Divider sx={{ my: 2, bgcolor: "lightgray", opacity: 0.3, boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }} />
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>Available for rent</Typography>
            <Typography>Rent per day: ₹{equipment.price}</Typography>

           {/* Date Pickers */}
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Grid container spacing={2} sx={{ mt: 2 }}>
    <Grid item xs={6}>
      <Typography sx={{ fontWeight: "bold" }}>Select Pickup Date:</Typography>
      <DatePicker
        value={pickupDate}
        onChange={(newDate) => setPickupDate(newDate)}
        slotProps={{ textField: { fullWidth: true, size: "small" } }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography sx={{ fontWeight: "bold" }}>Select Dropoff Date:</Typography>
      <DatePicker
        value={dropoffDate}
        onChange={(newDate) => setDropoffDate(newDate)}
        slotProps={{ textField: { fullWidth: true, size: "small" } }}
      />
    </Grid>
  </Grid>
</LocalizationProvider>


            {/* Number of Days Selector */}
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>Select Number of Days:</Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Button sx={{ minWidth: 20 }} onClick={handleDecrease}>−</Button>
              </Grid>
              <Grid item>
                <Typography>{days}</Typography> {/* Display the number of days */}
              </Grid>
              <Grid item>
                <Button sx={{ minWidth: 20 }} onClick={handleIncrease}>+</Button>
              </Grid>
            </Grid>

            {/* Total Rent */}
            <Typography sx={{ mt: 2, fontSize: 20, fontWeight: "bold" }}>Total Rent: ₹{totalRent}</Typography>

            {/* Buttons: Add to Cart and Rent Now */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained"  sx={{ backgroundColor: "primary" }}>
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" sx={{ backgroundColor: "primary" }}>
                  Rent Now
                </Button>
              </Grid></Grid>
          </Card>
        </Grid></Grid>

{/* Owner Info Section */}
{equipment.owner && (
  <Box sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 2, position: 'relative' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CardMedia component="img" image={equipment.owner.profilePhoto} alt={equipment.owner.name}
        sx={{ width: 50, height: 50, borderRadius: '50%', mr: 2, mb: 9 }} />
      <Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
          {equipment.owner.name}
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          <strong>Address:</strong> {equipment.owner.address}
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          <strong>Contact:</strong> {equipment.owner.contact}
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          <strong>Email:</strong> {equipment.owner.email}
        </Typography>
      </Box>
    </Box>

    {/* Icons for Chat and Message */}
    <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 2 }}>
      <Call sx={{ cursor: 'pointer', color: 'primary.main' }} />
      <Message sx={{ cursor: 'pointer', color: 'primary.main' }} />
    </Box>
  </Box>
)}


      {/* Description and Reviews Section */}
<Box sx={{ mt: 4, p: 4, borderRadius: 4, boxShadow: 3, backgroundColor: 'background.paper'}}>
  {/* Description Section */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 400, mb: 3, pb: 1, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block',fontSize: 16 }}>
      Product Description
    </Typography>
    <Paper elevation={0} sx={{p: 3, borderRadius: 2, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
      <Typography variant="body1" sx={{ lineHeight: 1.7,color: 'text.secondary',fontSize: '1.1rem' }}>
        {equipment.description}
 </Typography>
    </Paper>
  </Box>

  {/* Reviews Section */}
  <Box>
    <Typography variant="h4" sx={{  fontWeight: 200, mb: 3, pb: 1, borderBottom: '2px solid', borderColor: 'primary.main',
       display: 'inline-block', fontSize: 16 }}>
      Customer Reviews ({equipment.reviews.length})
    </Typography>

    <Grid container spacing={3}>
      {equipment.reviews.map((review, index) => (
        <Grid item xs={12} key={index}>
          <Paper sx={{p: 3, borderRadius: 2, transition: '0.3s all', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                {review.user[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {review.user}
                </Typography>
                <Rating  value={4.5}  precision={0.5}  readOnly size="small" sx={{ color: '#ffc107', mt: 0.5 }}/>
              </Box>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ pl: 2, fontStyle: 'italic', position: 'relative', '&:before': {content: '"“"',
                position: 'absolute', left: 0, top: -8, fontSize: '3rem', color: '#dee2e6' } }}>
              {review.review}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'right', fontStyle: 'italic' }}>
              Reviewed on March 15, 2023
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Add Review Button */}
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Button variant="outlined" color="primary" startIcon={<RateReviewIcon />}
        sx={{  borderRadius: 2, px: 4, py: 1.5, fontWeight: 600, fontSize:12, '&:hover': { bgcolor: 'primary.main', color: 'white' }}} >
        Write a Review
      </Button>
    </Box> </Box> </Box>
    </Container>
  );
};

export default EquipmentDetail;
