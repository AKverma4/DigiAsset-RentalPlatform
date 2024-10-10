import React, { createContext, useContext, useState, useEffect, Key } from 'react';

interface Equipment {
  name: string;
  category: string;
  condition: string;
  rentalPrice: number;
  image: string;
  description: string;
}

interface CartItem extends Equipment {
  price: number;
  id: Key | null | undefined;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Equipment) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  updateQuantity: (itemName: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Equipment) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // Convert Equipment to CartItem
        const newCartItem: CartItem = {
          ...item,
          quantity: 1,
          price: item.rentalPrice,
          id: item.name // Assuming name is unique, otherwise use a proper ID
        };
        return [...prevCart, newCartItem];
      }
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
