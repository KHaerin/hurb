// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [reloadContact, setReloadContact] = useState(false);

  const toggleReloadContact = (state) => {
    setReloadContact(state);
  };

  return (
    <CartContext.Provider value={{ reloadContact, toggleReloadContact }}>
      {children}
    </CartContext.Provider>
  );
};
