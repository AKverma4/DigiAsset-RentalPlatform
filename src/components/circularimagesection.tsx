// CircularImageSection.tsx
import { Box, Card, CardMedia, Typography } from '@mui/material';

const CircularImageSection = () => {
  const ellipseData = [
    {
      title: 'Webcams',
      image: 'src/assets/images/webcams.jpg',
    },
    {
      title: 'Speakers',
      image: 'src/assets/images/speakers.jpg',
    },
    {
      title: 'Microphones',
      image: 'src/assets/images/microphone.jpg',
    },
    {
      title: 'Tripods',
      image: 'src/assets/tripods.jpg',
    },
    {
      title: 'VR Headsets',
      image: 'src/assets/images/vr-headset.jpg',
    },
  ];

  return (
    <Box textAlign="center" mt={6}> {/* Center the text */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}> {/* Added margin-bottom for spacing */}
        Explore Our Equipment
      </Typography>
      <Box display="flex" justifyContent="center">
        {ellipseData.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 4 }}>
            <Card
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt={item.title}
                sx={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Card>
            <Typography variant="caption" align="center" sx={{ mt: 1 }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CircularImageSection;
