import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../components/helpers/index';
import { AuthModal } from '../components/shared/AuthModal';
import { ConfirmModal } from '../components/shared/confirmModal';

export const CartPage = () => {
  const { items, guestItems, totalItems, totalPrice, isGuest,
          updateQuantity, removeFromCart, removeGuestItem, updateGuestQty,
          clearCart, isLoading } = useCart();
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const [authModalOpen,  setAuthModalOpen]  = useState(false);
  const [confirmOpen,    setConfirmOpen]    = useState(false);
  const [clearing,       setClearing]       = useState(false);

  const displayItems = isGuest
    ? guestItems.map(g => ({ ...g, id: g.product_id }))
    : items;

  if (isLoading) return <div className="text-center py-20 text-xl">Cargando carrito...</div>;

  if (!displayItems.length) {
    return (
      <div className="text-center py-20 space-y-4">
        <FiShoppingBag size={60} className="mx-auto text-gray-300" />
        <p className="text-xl text-gray-500">Tu carrito está vacío</p>
        <Link to="/products" className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors">
          Ver Productos
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) { setAuthModalOpen(true); }
    else       { navigate('/checkout'); }
  };

  const handleClearCart = async () => {
    setClearing(true);
    await clearCart();
    setClearing(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-6 md:py-10 px-3 md:px-4">

        {/* Título + botón vaciar */}
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-slate-800">
            Tu Carrito <span className="text-sm md:text-lg font-normal text-gray-400">({totalItems} items)</span>
          </h1>
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={clearing}
            className="flex items-center gap-2 text-xs md:text-sm text-red-400 hover:text-red-600 hover:bg-red-50 px-2 md:px-3 py-2 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
            {clearing ? 'Vaciando...' : 'Vaciar carrito'}
          </button>
        </div>

        {isGuest && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 md:px-4 py-3 text-xs md:text-sm text-amber-800 mb-4 md:mb-6">
            🛒 Tu carrito se guardará cuando inicies sesión. ¡No pierdas tus productos!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Lista */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {displayItems.map(item => (
              <div key={item.product_id} className="flex gap-3 md:gap-4 bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
                <img
                  src={item.productos.image}
                  alt={item.productos.name}
                  className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-lg bg-gray-50 p-1 md:p-2 flex-shrink-0"
                />
                <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
                  <p className="font-semibold text-slate-800 text-xs md:text-sm line-clamp-2">{item.productos.name}</p>
                  <p className="text-amber-500 font-bold text-sm md:text-base">{formatPrice(item.productos.price)}</p>

                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => isGuest
                          ? updateGuestQty(item.product_id, item.quantity - 1)
                          : (item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id))
                        }
                        className="px-2 md:px-3 py-1 md:py-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-semibold min-w-[1.5rem] md:min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => isGuest
                          ? updateGuestQty(item.product_id, item.quantity + 1)
                          : updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.productos.stock}
                        className="px-2 md:px-3 py-1 md:py-1.5 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => isGuest ? removeGuestItem(item.product_id) : removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors ml-auto"
                    >
                      <FiTrash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-slate-800 text-sm md:text-base">
                    {formatPrice(item.productos.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 h-fit space-y-3 md:space-y-4 lg:sticky lg:top-4">
            <h2 className="text-base md:text-lg font-bold text-slate-800">Resumen del pedido</h2>

            <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              {displayItems.map(item => (
                <div key={item.product_id} className="flex justify-between text-gray-600">
                  <span className="truncate max-w-[130px] md:max-w-[160px]">{item.productos.name} x{item.quantity}</span>
                  <span>{formatPrice(item.productos.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 md:pt-4 flex justify-between font-bold text-base md:text-lg">
              <span>Total</span>
              <span className="text-amber-500">{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-slate-800 hover:bg-amber-400 text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors duration-300 text-sm md:text-base"
            >
              {isGuest ? 'Iniciar Sesión para Comprar' : 'Proceder al Checkout'}
            </button>

            <Link to="/products" className="block text-center text-xs md:text-sm text-gray-500 hover:text-amber-500 transition-colors">
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
        onSuccess={() => { setAuthModalOpen(false); navigate('/checkout'); }}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        title="Vaciar carrito"
        message="¿Estás seguro? Se eliminarán todos los productos del carrito."
        confirmText="Sí, vaciar"
        cancelText="Cancelar"
        onConfirm={() => { setConfirmOpen(false); handleClearCart(); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};