import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Dialog,
  IconButton, // Import IconButton for the edit icon
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import AddEquipmentForm from './AddEquipmentForm';
import AddEquipmentButton from './AddEquipmentButton';

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State to manage edit dialog

  const [address, setAddress] = useState({
    name: 'Green Valley Apartment',
    street: 'Lane 4, Off Baner Road',
    area: 'Baner, Pune',
    zipCode: '411045',
  });

  const [personalDetails, setPersonalDetails] = useState({
    name: 'Anirudh Sighaniya',
    phone: '+91 98765 43210',
    email: 'anirudh.sighaniya@example.com',
    address: 'Maharashtra, India',
    totalEquipment: 8,
    rating: '⭐⭐⭐⭐ 4.0/5',
  });

  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [isPersonalDetailsEditing, setIsPersonalDetailsEditing] = useState(false);

  const [newAddress, setNewAddress] = useState({ ...address });
  const [newPersonalDetails, setNewPersonalDetails] = useState({ ...personalDetails });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true); // Open edit dialog when the edit icon is clicked
  };

  const handleEditClose = () => {
    setEditDialogOpen(false); // Close edit dialog
  };

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setIsAddressEditing(false);
  };

  const handleSavePersonalDetails = () => {
    setPersonalDetails(newPersonalDetails);
    setIsPersonalDetailsEditing(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 0, mb: 4 }} gutterBottom>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info + Address Details */}
        <Grid item xs={12} md={4}>
          {/* Profile Info */}
          <Card sx={{ width: '150%', mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar
                  alt="Anirudh Sighaniya"
                  src="/path-to-profile-picture.jpg"
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Anirudh Sighaniya</Typography>
                  <Typography color="textSecondary">Renter/Owner</Typography>
                </Box>
                {/* <IconButton
                  sx={{ ml: 'auto', color: 'primary.main' }}
                  onClick={handleEditClick} // Opens the edit dialog
                >
                  <EditIcon />
                </IconButton> */}
              </Box>
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card sx={{ width: '150%' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">Address Details</Typography>
                <IconButton
                  sx={{ ml: 'auto', color: 'primary.main' }}
                  onClick={() => setIsAddressEditing(true)} // Enable editing on double click
                >
                  <EditIcon />
                </IconButton>
              </Box>
              {isAddressEditing ? (
                <Box>
                  <TextField
                    label="Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Area"
                    value={newAddress.area}
                    onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Zip Code"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button onClick={handleSaveAddress} color="primary">Save</Button>
                </Box>
              ) : (
                <Box>
                  <Typography>Name: {address.name}</Typography>
                  <Typography>Street: {address.street}</Typography>
                  <Typography>Area: {address.area}</Typography>
                  <Typography>Zip Code: {address.zipCode}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '50%', height: '100%', marginLeft: '220px' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ mb: 1 }}>Personal Details</Typography>
                <IconButton
                  sx={{ ml: 'auto', color: 'primary.main' }}
                  onClick={() => setIsPersonalDetailsEditing(true)} // Enable editing on double click
                >
                  <EditIcon />
                </IconButton>
              </Box>
              {isPersonalDetailsEditing ? (
                <Box>
                  <TextField
                    label="Name"
                    value={newPersonalDetails.name}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, name: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Phone"
                    value={newPersonalDetails.phone}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, phone: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Email"
                    value={newPersonalDetails.email}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, email: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Address"
                    value={newPersonalDetails.address}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, address: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Total Equipment Listed"
                    value={newPersonalDetails.totalEquipment}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, totalEquipment: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Rating"
                    value={newPersonalDetails.rating}
                    onChange={(e) => setNewPersonalDetails({ ...newPersonalDetails, rating: e.target.value })}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button onClick={handleSavePersonalDetails} color="primary">Save</Button>
                </Box>
              ) : (
                <Box>
                  <Typography>Name: {personalDetails.name}</Typography>
                  <Typography>Phone: {personalDetails.phone}</Typography>
                  <Typography>Email: {personalDetails.email}</Typography>
                  <Typography>Address: {personalDetails.address}</Typography>
                  <Typography>Total Equipment Listed: {personalDetails.totalEquipment}</Typography>
                  <Typography>Rating: {personalDetails.rating}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" sx={{ mt: 10, mb: 2 }} gutterBottom>
        My Listed Equipment
      </Typography>
      <AddEquipmentButton />

      {/* Add Equipment Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <AddEquipmentForm />
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        {/* Add your profile edit form here */}
        <Typography variant="h6" sx={{ padding: 2 }}>Edit Profile</Typography>
        {/* Your form fields go here */}
        <Button onClick={handleEditClose} color="primary">Close</Button>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
