import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const GUEST_CART_KEY = 'guest_cart';

export interface CartItem {
  id:         number;
  quantity:   number;
  product_id: number;
  productos: {
    id:    number;
    name:  string;
    price: number;
    image: string;
    stock: number;
  };
}

interface GuestItem {
  product_id: number;
  quantity:   number;
  productos: {
    id:    number;
    name:  string;
    price: number;
    image: string;
    stock: number;
  };
}

interface CartContextType {
  items:          CartItem[];
  guestItems:     GuestItem[];
  totalItems:     number;
  totalPrice:     number;
  isLoading:      boolean;
  isGuest:        boolean;
  addToCart:      (product: CartItem['productos'], qty?: number) => Promise<void>;
  updateQuantity: (itemId: number, qty: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  removeGuestItem:(productId: number) => void;
  updateGuestQty: (productId: number, qty: number) => void;
  clearCart:      () => Promise<void>;
  refreshCart:    () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

const getGuestCart = (): GuestItem[] => {
  try { return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]'); }
  catch { return []; }
};
const saveGuestCart = (items: GuestItem[]) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token, user } = useAuth();
  const [items,      setItems]      = useState<CartItem[]>([]);
  const [guestItems, setGuestItems] = useState<GuestItem[]>(getGuestCart);
  const [isLoading,  setIsLoading]  = useState(false);

  const isGuest = !user;

  // ← Función que genera headers frescos cada vez usando el token actual
  const getHeaders = () => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const refreshCart = async () => {
    if (!token) { setItems([]); return; }
    setIsLoading(true);
    try {
      const res  = await fetch(`${API}/cart`, { headers: getHeaders() });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    finally  { setIsLoading(false); }
  };

  const mergeGuestCart = async () => {
    const guest = getGuestCart();
    if (!guest.length) return;
    await Promise.all(
      guest.map(item =>
        fetch(`${API}/cart`, {
          method:  'POST',
          headers: getHeaders(),
          body:    JSON.stringify({ product_id: item.product_id, quantity: item.quantity }),
        })
      )
    );
    localStorage.removeItem(GUEST_CART_KEY);
    setGuestItems([]);
    await refreshCart();
  };

  useEffect(() => {
    if (user && token) {
      mergeGuestCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const addToCart = async (product: CartItem['productos'], qty = 1) => {
    if (isGuest) {
      const current = getGuestCart();
      const existing = current.find(i => i.product_id === product.id);
      let updated: GuestItem[];
      if (existing) {
        updated = current.map(i =>
          i.product_id === product.id
            ? { ...i, quantity: Math.min(i.quantity + qty, product.stock) }
            : i
        );
      } else {
        updated = [...current, { product_id: product.id, quantity: qty, productos: product }];
      }
      saveGuestCart(updated);
      setGuestItems(updated);
    } else {
      await fetch(`${API}/cart`, {
        method:  'POST',
        headers: getHeaders(),
        body:    JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      await refreshCart();
    }
  };

  const updateQuantity = async (itemId: number, qty: number) => {
    await fetch(`${API}/cart/${itemId}`, {
      method:  'PUT',
      headers: getHeaders(),
      body:    JSON.stringify({ quantity: qty }),
    });
    await refreshCart();
  };

  const removeFromCart = async (itemId: number) => {
    await fetch(`${API}/cart/${itemId}`, { method: 'DELETE', headers: getHeaders() });
    await refreshCart();
  };

  const removeGuestItem = (productId: number) => {
    const updated = guestItems.filter(i => i.product_id !== productId);
    saveGuestCart(updated);
    setGuestItems(updated);
  };

  const updateGuestQty = (productId: number, qty: number) => {
    const updated = qty <= 0
      ? guestItems.filter(i => i.product_id !== productId)
      : guestItems.map(i => i.product_id === productId ? { ...i, quantity: qty } : i);
    saveGuestCart(updated);
    setGuestItems(updated);
  };

  const clearCart = async () => {
    await fetch(`${API}/cart/clear`, { method: 'POST', headers: getHeaders() });
    setItems([]);
  };

  const activeItems = isGuest ? guestItems : items;
  const totalItems  = activeItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice  = activeItems.reduce((s, i) => s + i.productos.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, guestItems, totalItems, totalPrice, isLoading, isGuest,
      addToCart, updateQuantity, removeFromCart, removeGuestItem,
      updateGuestQty, clearCart, refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};