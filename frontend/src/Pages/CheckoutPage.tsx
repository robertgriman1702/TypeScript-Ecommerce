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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const currentToken = token || localStorage.getItem('token');
      const res  = await fetch(`${API}/orders`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' },
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
      <div className="text-center py-16 space-y-5 px-4">
        <FiCheckCircle size={64} className="mx-auto text-green-500" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">¡Orden Confirmada!</h1>
        <p className="text-gray-500 text-sm">Tu orden #{orderId} fue registrada exitosamente.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={() => navigate('/orders')}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm">
            Ver mis Órdenes
          </button>
          <button onClick={() => navigate('/')}
            className="border border-gray-200 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 md:py-10 px-3 md:px-4 space-y-4 md:space-y-6">
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">Confirmar Pedido</h1>

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-slate-700 text-sm md:text-base">Resumen</h2>
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.productos.image} alt={item.productos.name}
              className="w-12 h-12 md:w-14 md:h-14 object-contain bg-gray-50 rounded-lg p-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-slate-800 line-clamp-1">{item.productos.name}</p>
              <p className="text-xs text-gray-400">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold text-xs md:text-sm flex-shrink-0">{formatPrice(item.productos.price * item.quantity)}</p>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between text-base md:text-lg font-bold">
          <span>Total a pagar</span>
          <span className="text-amber-500">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs md:text-sm text-amber-800">
        📞 Una vez confirmada tu orden, nos comunicaremos contigo por WhatsApp para coordinar el pago y la entrega.
      </div>

      <button onClick={handleConfirm} disabled={loading || !items.length}
        className="w-full bg-slate-800 hover:bg-amber-400 disabled:bg-gray-300 text-white font-semibold py-4 rounded-lg transition-colors duration-300 text-base md:text-lg">
        {loading ? 'Procesando...' : 'Confirmar Orden'}
      </button>
    </div>
  );
};