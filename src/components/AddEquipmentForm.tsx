import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Select, Label } from 'theme-ui';
import { Stepper, Step, StepLabel } from '@mui/material';

const AddEquipmentForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        condition: '',
        rentalPrice: '',
        depositAmount: '',
        availabilityDates: '',
        image: '' as string,
        manufacturer: '',
        location: '',
        contactInfo: '',
    });

    const [activeStep, setActiveStep] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === 'image' && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    [name]: reader.result as string,
                }));
            };
            reader.readAsDataURL(files[0]);
        } else if (name === 'imageUrl') {
            setFormData(prev => ({
                ...prev,
                image: value,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const equipmentList = JSON.parse(localStorage.getItem('equipmentList') || '[]');
        equipmentList.push(formData);
        localStorage.setItem('equipmentList', JSON.stringify(equipmentList));
        console.log('Saved equipment:', formData);
        console.log('Current equipment list:', equipmentList);
        if (onClose) onClose();
    };

    const addPlaceholderEffect = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const placeholder = target.getAttribute('placeholder');
        if (placeholder) {
            target.setAttribute('data-placeholder', placeholder);
            target.setAttribute('placeholder', '');
        }
    };

    const removePlaceholderEffect = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const originalPlaceholder = target.getAttribute('data-placeholder');
        if (originalPlaceholder) {
            target.setAttribute('placeholder', originalPlaceholder);
        }
    };

    const steps = ['Basic Info', 'Pricing & Availability', 'Description & Image', 'Additional Details'];

    const isStepComplete = (step: number) => {
        switch (step) {
            case 0:
                return formData.name !== '' && formData.category !== '' && formData.condition !== '';
            case 1:
                return formData.rentalPrice !== '' && formData.depositAmount !== '' && formData.availabilityDates !== '';
            case 2:
                return formData.description !== '' && formData.image !== '';
            case 3:
                return formData.manufacturer !== '' && formData.location !== '' && formData.contactInfo !== '';
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
        <Box 
            as="form" 
            onSubmit={handleSubmit} 
            style={{
                width: '100%',
                maxWidth: '600px',
                margin: '1px auto', 
                padding: '10px 20px 0px 20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                fontFamily: 'times new roman, sans-serif',
                // border: '1px solid #0070f3',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#0070f3', fontSize: '32px', fontWeight: 'bold' }}>Add Equipment</h2>

            <Stepper activeStep={activeStep} sx={{ marginBottom: '30px' }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
                {activeStep === 0 && (
                    <>
                        <div style={{ flex: '1 1 100%' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Equipment Name
                            </Label>
                            <Input 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter equipment name"
                                style={{ 
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                            <div style={{ flex: '1 1 50%' }}>
                                <Label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px', 
                                    fontWeight: 'bold', 
                                    color: '#333',
                                    fontSize: '18px',
                                    width: '100%',
                                }}>
                                    Category
                                </Label>
                                <Select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleInputChange} 
                                    required 
                                    style={{
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#333',
                                        backgroundColor: '#f9f9f9',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onFocus={addPlaceholderEffect}
                                    onBlur={removePlaceholderEffect}
                                >
                                    <option value="">Select...</option>
                                    <option value="tools">Tools</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="furniture">Furniture</option>
                                </Select>
                            </div>

                            <div style={{ flex: '1 1 50%' }}>
                                <Label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px', 
                                    fontWeight: 'bold', 
                                    color: '#333',
                                    fontSize: '18px',
                                    width: '100%',
                                }}>
                                    Condition
                                </Label>
                                <Select 
                                    name="condition" 
                                    value={formData.condition} 
                                    onChange={handleInputChange} 
                                    required 
                                    style={{
                                        width: '100%', 
                                        padding: '12px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#333',
                                        backgroundColor: '#f9f9f9',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onFocus={addPlaceholderEffect}
                                    onBlur={removePlaceholderEffect}
                                >
                                    <option value="">Select...</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                    <option value="refurbished">Refurbished</option>
                                </Select>
                            </div>
                        </div>
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Rental Price per Day/Week
                            </Label>
                            <Input 
                                type="number" 
                                name="rentalPrice" 
                                value={formData.rentalPrice} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter rental price"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Deposit Amount
                            </Label>
                            <Input 
                                type="number" 
                                name="depositAmount" 
                                value={formData.depositAmount} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter deposit amount"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Availability Dates
                            </Label>
                            <Input 
                                type="text" 
                                name="availabilityDates" 
                                value={formData.availabilityDates} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter availability dates"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>
                    </>
                )}

                {activeStep === 2 && (
                    <>
                        <div style={{ flex: '1 1 100%' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Description
                            </Label>
                            <Textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter equipment description"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                    minHeight: '60px', // Reduced from 100px to 80px
                                    height: '60px',    // Added fixed height
                                    resize: 'vertical' // Allow vertical resizing if needed
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ flex: '1 1 100%' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Image Upload or URL
                            </Label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                    onChange={handleInputChange} 
                                    style={{ 
                                        flex: 1,
                                        padding: '12px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '8px',
                                        backgroundColor: '#f9f9f9',
                                    }} 
                                />
                                <Input 
                                    type="text" 
                                    name="imageUrl" 
                                    value={formData.image} 
                                    onChange={handleInputChange} 
                                    placeholder="Or enter image URL"
                                    style={{
                                        flex: 1,
                                        padding: '12px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        color: '#333',
                                        backgroundColor: '#f9f9f9',
                                        transition: 'all 0.3s ease',
                                    }} 
                                    onFocus={addPlaceholderEffect}
                                    onBlur={removePlaceholderEffect}
                                />
                            </div>
                        </div>
                    </>
                )}

                {activeStep === 3 && (
                    <>
                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Manufacturer/Brand
                            </Label>
                            <Input 
                                name="manufacturer" 
                                value={formData.manufacturer} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter manufacturer/brand"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Location of Equipment
                            </Label>
                            <Input 
                                name="location" 
                                value={formData.location} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter equipment location"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>

                        <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                            <Label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                                Contact Information
                            </Label>
                            <Input 
                                name="contactInfo" 
                                value={formData.contactInfo} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter contact information"
                                style={{
                                    width: '100%', 
                                    padding: '12px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: '#333',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'all 0.3s ease',
                                }} 
                                onFocus={addPlaceholderEffect}
                                onBlur={removePlaceholderEffect}
                            />
                        </div>
                    </>
                )}
            </div>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                        padding: '10px 20px',
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: '#e0e0e0',
                        },
                        '&:disabled': {
                            backgroundColor: '#f0f0f0',
                            color: '#999',
                            cursor: 'not-allowed',
                        },
                    }}
                >
                    Back
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button
                        type="submit"
                        disabled={!isStepComplete(activeStep)}
                        sx={{
                            padding: '10px 20px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                            '&:disabled': {
                                backgroundColor: '#ccc',
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Submit
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!isStepComplete(activeStep)}
                        sx={{
                            padding: '10px 20px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                            '&:disabled': {
                                backgroundColor: '#ccc',
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AddEquipmentForm;