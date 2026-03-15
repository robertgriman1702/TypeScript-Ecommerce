import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../components/helpers/index';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  pending:   { label: 'Pendiente',  icon: FiClock,       color: 'text-yellow-500 bg-yellow-50' },
  confirmed: { label: 'Confirmado', icon: FiCheckCircle, color: 'text-blue-500 bg-blue-50'     },
  delivered: { label: 'Entregado',  icon: FiTruck,       color: 'text-green-500 bg-green-50'   },
};

export const OrdersPage = () => {
  const { token, user } = useAuth();
  const [orders,    setOrders]    = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const currentToken = token || localStorage.getItem('token');
    fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${currentToken}` } })
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setIsLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="text-center py-16 space-y-4 px-4">
        <p className="text-gray-500">Inicia sesión para ver tus órdenes</p>
        <Link to="/login" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (isLoading) return <div className="text-center py-20 text-xl">Cargando órdenes...</div>;

  if (!orders.length) {
    return (
      <div className="text-center py-16 space-y-4 px-4">
        <FiPackage size={50} className="mx-auto text-gray-300" />
        <p className="text-gray-500">Aún no tienes órdenes</p>
        <Link to="/products" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm">
          Ir a Comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-10 px-3 md:px-4 space-y-4">
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">Mis Órdenes</h1>

      {orders.map(order => {
        const status = statusConfig[order.status] ?? statusConfig.pending;
        const StatusIcon = status.icon;

        return (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-slate-800 text-sm">Orden #{order.id}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full ${status.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </div>
            </div>

            {/* Items */}
            <div className="px-4 py-3 space-y-2.5">
              {order.order_items?.map((item: any) => (
                <div key={item.productos?.id} className="flex items-center gap-3">
                  <img src={item.productos?.image} alt={item.productos?.name}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain bg-gray-50 rounded-lg p-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-slate-800 line-clamp-1">{item.productos?.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity} — {formatPrice(item.price)} c/u</p>
                  </div>
                  <p className="text-xs md:text-sm font-semibold flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
              <span className="text-xs text-gray-500">Total pagado</span>
              <span className="font-bold text-sm md:text-lg text-amber-500">{formatPrice(order.total)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};