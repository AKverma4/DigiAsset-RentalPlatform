import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import EquipmentCard from './EquipmentCard';
import UpdateEquipmentModal from './UpdateEquipmentModal';
import EquipmentDetailModal from './EquipmentDetailModal';

interface Equipment {
  name: string;
  category: string;
  condition: string;
  rentalPrice: number;
  image: string;
  description: string;
  depositAmount: string;
  availabilityDates: string;
  manufacturer: string;
  location: string;
  contactInfo: string;
}

const EquipmentList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const storedEquipment = localStorage.getItem('equipmentList');
    if (storedEquipment) {
      setEquipmentList(JSON.parse(storedEquipment));
    }
  }, []);

  const handleUpdateClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (updatedEquipment: Equipment) => {
    const updatedList = equipmentList.map(item =>
      item.name === selectedEquipment?.name ? updatedEquipment : item
    );
    setEquipmentList(updatedList);
    localStorage.setItem('equipmentList', JSON.stringify(updatedList));
    setIsUpdateModalOpen(false);
    setSelectedEquipment(null);
  };

  const handleDelete = (index: number) => {
    const updatedList = equipmentList.filter((_, i) => i !== index);
    setEquipmentList(updatedList);
    localStorage.setItem('equipmentList', JSON.stringify(updatedList));
  };

  const handleViewClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDetailModalOpen(true);
  };

  const filteredEquipment = equipmentList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: -1, // Negative margin to counteract padding
      }}>
        {filteredEquipment.map((item, index) => (
          <Box 
            key={`${item.name}-${index}`} 
            sx={{ 
              width: {
                xs: '100%',
                sm: '50%',
                md: '33.333%',
                lg: '25%'
              },
              padding: 1, // Padding for spacing
            }}
          >
            <EquipmentCard
              name={item.name}
              category={item.category}
              condition={item.condition}
              rentalPrice={item.rentalPrice}
              image={item.image}
              description={item.description}
              onDelete={() => handleDelete(index)}
              onUpdate={() => handleUpdateClick(item)}
              onView={() => handleViewClick(item)}
            />
          </Box>
        ))}
      </Box>
      <UpdateEquipmentModal
        open={isUpdateModalOpen}
        equipment={selectedEquipment}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={(updatedEquipment: Partial<Equipment>) => handleUpdateSubmit(updatedEquipment as Equipment)}
      />
      <EquipmentDetailModal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        equipment={selectedEquipment}
      />
    </Container>
  );
};

export default EquipmentList;
