// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveNavbarWithDrawer from "./components/ResponsiveNavbarWithDrawer";
import AddEquipmentForm from "./components/AddEquipmentForm";
import LoginPage from "./Pages/LoginPage";
import { Box } from "@mui/material";
import ContactPage from "./Pages/ContactPage";
import ItemsPage from "./Pages/ItemsPage";
import CartPage from "./Pages/Cart Page/CartPage"; // Remove the space after 'CartPage'
import { CartProvider } from "./contexts/CartContext";
import ProfilePage from "./Pages/ProfilePage";
import Home from "./Pages/Home/Home";
import { AuthProvider } from "./contexts/authentication";
// import ProtectedRoute from './components/ProtectedRoute';
import SignUp from "./components/SingUp";

interface AppState {
  searchTerm: string;
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <AuthProvider>
        <CartProvider>
          <Router>
            <ResponsiveNavbarWithDrawer onSearch={this.handleSearch}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/add-equipment" element={<AddEquipmentForm />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/items" element={<ItemsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                    path="/order-delivery"
                    element={<div>Order Delivery Page</div>}
                  />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } /> */}
                </Routes>
              </Box>
            </ResponsiveNavbarWithDrawer>
          </Router>
        </CartProvider>
      </AuthProvider>
    );
  }
}

export default App;
