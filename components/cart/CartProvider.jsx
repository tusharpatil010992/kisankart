'use client';

import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext(null);

const STORAGE_KEY = 'kisankart-cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], hydrated: false });
  const { items, hydrated } = cart;

  useEffect(() => {
    // localStorage isn't available during SSR, so the cart must be read
    // after mount — reading it during render would cause a hydration mismatch.
    const stored = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart({ items: stored ? JSON.parse(stored) : [], hydrated: true });
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function setItems(updater) {
    setCart((current) => ({
      ...current,
      items: typeof updater === 'function' ? updater(current.items) : updater,
    }));
  }

  function addItem(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...current,
        { productId: product.id, name: product.name, price: product.price, quantity },
      ];
    });
  }

  function removeItem(productId) {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return removeItem(productId);
    setItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}
