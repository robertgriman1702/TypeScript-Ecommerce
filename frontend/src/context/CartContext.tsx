import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

const API = 'http://localhost:3000/api';
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

// Item simplificado para el carrito guest (sin datos del producto completos)
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

// ─── Helpers localStorage ────────────────────────────────────────────────────
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
  const authHeaders = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  // ─── Carrito DB ─────────────────────────────────────────────────────────────
  const refreshCart = async () => {
    if (!token) { setItems([]); return; }
    setIsLoading(true);
    try {
      const res  = await fetch(`${API}/cart`, { headers: authHeaders });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    finally  { setIsLoading(false); }
  };

  // ─── Fusión: guest → DB al loguearse ────────────────────────────────────────
  const mergeGuestCart = async () => {
    const guest = getGuestCart();
    if (!guest.length) return;

    // Agrega cada item del guest al carrito DB
    await Promise.all(
      guest.map(item =>
        fetch(`${API}/cart`, {
          method:  'POST',
          headers: authHeaders,
          body:    JSON.stringify({ product_id: item.product_id, quantity: item.quantity }),
        })
      )
    );

    // Limpia el guest cart
    localStorage.removeItem(GUEST_CART_KEY);
    setGuestItems([]);
    await refreshCart();
  };

  // Cuando el usuario inicia sesión, fusiona
  useEffect(() => {
    if (user && token) {
      mergeGuestCart();
    } else {
      setItems([]);
    }
  }, [user]);

  // ─── Agregar al carrito ──────────────────────────────────────────────────────
  const addToCart = async (product: CartItem['productos'], qty = 1) => {
    if (isGuest) {
      // Modo guest: guarda en localStorage
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
      // Modo logueado: guarda en DB
      await fetch(`${API}/cart`, {
        method:  'POST',
        headers: authHeaders,
        body:    JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      await refreshCart();
    }
  };

  // ─── Actualizar cantidad (DB) ────────────────────────────────────────────────
  const updateQuantity = async (itemId: number, qty: number) => {
    await fetch(`${API}/cart/${itemId}`, {
      method:  'PUT',
      headers: authHeaders,
      body:    JSON.stringify({ quantity: qty }),
    });
    await refreshCart();
  };

  // ─── Eliminar item (DB) ──────────────────────────────────────────────────────
  const removeFromCart = async (itemId: number) => {
    await fetch(`${API}/cart/${itemId}`, { method: 'DELETE', headers: authHeaders });
    await refreshCart();
  };

  // ─── Eliminar item guest ─────────────────────────────────────────────────────
  const removeGuestItem = (productId: number) => {
    const updated = guestItems.filter(i => i.product_id !== productId);
    saveGuestCart(updated);
    setGuestItems(updated);
  };

  // ─── Actualizar cantidad guest ───────────────────────────────────────────────
  const updateGuestQty = (productId: number, qty: number) => {
    const updated = qty <= 0
      ? guestItems.filter(i => i.product_id !== productId)
      : guestItems.map(i => i.product_id === productId ? { ...i, quantity: qty } : i);
    saveGuestCart(updated);
    setGuestItems(updated);
  };

  const clearCart = async () => {
    await fetch(`${API}/cart/clear`, { method: 'DELETE', headers: authHeaders });
    setItems([]);
  };

  // ─── Totales ─────────────────────────────────────────────────────────────────
  const activeItems   = isGuest ? guestItems : items;
  const totalItems    = activeItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice    = activeItems.reduce((s, i) => s + i.productos.price * i.quantity, 0);

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