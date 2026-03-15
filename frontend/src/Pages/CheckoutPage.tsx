import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../components/helpers/index';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { token } = useAuth();
  const navigate  = useNavigate();
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error,   setError]     = useState('');
  const [orderId, setOrderId]   = useState<number | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${API}/orders`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrderId(data.order.id);
      clearCart();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-20 space-y-6">
        <FiCheckCircle size={80} className="mx-auto text-green-500" />
        <h1 className="text-3xl font-bold text-slate-800">¡Orden Confirmada!</h1>
        <p className="text-gray-500">Tu orden #{orderId} fue registrada exitosamente.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/orders')} className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
            Ver mis Órdenes
          </button>
          <button onClick={() => navigate('/')} className="border border-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Confirmar Pedido</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Resumen */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-semibold text-slate-700">Resumen</h2>
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <img src={item.productos.image} alt={item.productos.name} className="w-14 h-14 object-contain bg-gray-50 rounded-lg p-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.productos.name}</p>
              <p className="text-xs text-gray-400">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold text-sm">{formatPrice(item.productos.price * item.quantity)}</p>
          </div>
        ))}

        <div className="border-t pt-4 flex justify-between text-lg font-bold">
          <span>Total a pagar</span>
          <span className="text-amber-500">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Nota de pago */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        📞 Una vez confirmada tu orden, nos comunicaremos contigo por WhatsApp para coordinar el pago y la entrega.
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading || !items.length}
        className="w-full bg-slate-800 hover:bg-amber-400 disabled:bg-gray-300 text-white font-semibold py-4 rounded-lg transition-colors duration-300 text-lg"
      >
        {loading ? 'Procesando...' : 'Confirmar Orden'}
      </button>
    </div>
  );
};