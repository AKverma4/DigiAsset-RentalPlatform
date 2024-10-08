import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';

interface Equipment {
  name: string;
  category: string;
  condition: string;
  rentalPrice: number;
  image: string;
  description: string;
}

interface UpdateEquipmentModalProps {
  open: boolean;
  equipment: Equipment | null;
  onClose: () => void;
  onSubmit: (updatedEquipment: Equipment) => void;
}

const UpdateEquipmentModal: React.FC<UpdateEquipmentModalProps> = ({ open, equipment, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Equipment>({
    name: '',
    category: '',
    condition: '',
    rentalPrice: 0,
    image: '',
    description: '',
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    }
  }, [equipment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rentalPrice' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the modal after submission
  };

  const steps = ['Basic Info', 'Price & Condition', 'Image & Description'];

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.name !== '' && formData.category !== '';
      case 1:
        return formData.condition !== '' && formData.rentalPrice > 0;
      case 2:
        return formData.image !== '' && formData.description !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Equipment</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </>
          )}
          {activeStep === 1 && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Rental Price"
                name="rentalPrice"
                type="number"
                value={formData.rentalPrice}
                onChange={handleChange}
              />
            </>
          )}
          {activeStep === 2 && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {activeStep > 0 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button 
              onClick={handleNext} 
              variant="contained" 
              color="primary"
              disabled={!isStepComplete(activeStep)}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={!isStepComplete(activeStep)}
            >
              Update
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateEquipmentModal;
