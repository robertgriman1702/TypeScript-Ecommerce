import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../components/helpers/index';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  pending:   { label: 'Pendiente',   icon: FiClock,        color: 'text-yellow-500 bg-yellow-50'  },
  confirmed: { label: 'Confirmado',  icon: FiCheckCircle,  color: 'text-blue-500 bg-blue-50'      },
  delivered: { label: 'Entregado',   icon: FiTruck,        color: 'text-green-500 bg-green-50'    },
};

export const OrdersPage = () => {
  const { token, user } = useAuth();
  const [orders,    setOrders]    = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r  => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .finally(()  => setIsLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-xl text-gray-500">Inicia sesión para ver tus órdenes</p>
        <Link to="/login" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (isLoading) return <div className="text-center py-20 text-xl">Cargando órdenes...</div>;

  if (!orders.length) {
    return (
      <div className="text-center py-20 space-y-4">
        <FiPackage size={60} className="mx-auto text-gray-300" />
        <p className="text-xl text-gray-500">Aún no tienes órdenes</p>
        <Link to="/products" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
          Ir a Comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Mis Órdenes</h1>

      {orders.map(order => {
        const status = statusConfig[order.status] ?? statusConfig.pending;
        const StatusIcon = status.icon;

        return (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header de la orden */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="font-bold text-slate-800">Orden #{order.id}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${status.color}`}>
                <StatusIcon className="w-4 h-4" />
                {status.label}
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-3">
              {order.order_items?.map((item: any) => (
                <div key={item.productos?.id} className="flex items-center gap-3">
                  <img
                    src={item.productos?.image}
                    alt={item.productos?.name}
                    className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.productos?.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity} — {formatPrice(item.price)} c/u</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-500">Total pagado</span>
              <span className="font-bold text-lg text-amber-500">{formatPrice(order.total)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};