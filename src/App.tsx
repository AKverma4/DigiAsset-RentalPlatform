// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveNavbarWithDrawer from './components/ResponsiveNavbarWithDrawer';
import AddEquipmentForm from './components/AddEquipmentForm';
import AddEquipmentButton from './components/AddEquipmentButton';
import EquipmentList from './components/EquipmentList';
import LoginPage from './Pages/LoginPage';
import { Box } from '@mui/material';
import ContactPage from './Pages/ContactPage';
import ItemsPage from './Pages/ItemsPage';
import CartPage from './Pages/CartPage ';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <CartProvider>
      <Router>
        <ResponsiveNavbarWithDrawer onSearch={handleSearch}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={
                <>
                  <AddEquipmentButton />
                  <EquipmentList searchTerm={searchTerm} />
                </>
              } />
              <Route path="/add-equipment" element={<AddEquipmentForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-delivery" element={<div>Order Delivery Page</div>} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Box>  
        </ResponsiveNavbarWithDrawer>
      </Router>
    </CartProvider>
  );
};

export default App;
