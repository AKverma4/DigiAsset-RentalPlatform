import React, { useState, useCallback } from 'react';
import AddEquipmentForm from './AddEquipmentForm';

const AddEquipmentButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, []);

  return (
    <>
      <button
        onClick={openModal}
        style={{
          position: 'fixed',
          right: '20px',
          top: '20px',
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000,
          cursor: 'pointer',
          marginTop: '60px',
        }}
      >
        ADD Equipment
      </button>

      {isModalOpen && (
        <div 
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1001,
          }}
        >
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <AddEquipmentForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddEquipmentButton;
