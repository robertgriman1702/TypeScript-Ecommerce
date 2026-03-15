import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiClock } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '../helpers/index.ts';
import { useCart } from '../../context/CartContext';

interface Props {
  img:     string;
  name:    string;
  price:   number;
  id:      number;
  stock:   number;
  badge?:  string;
  rating?: number;
}

export const CardProduct = ({ img, name, price, id, stock, badge, rating = 4.5 }: Props) => {
  const { addToCart } = useCart();
  const [isFav, setIsFav] = useState(false);
  const [added, setAdded] = useState(false);

  const badgeColor: Record<string, string> = {
    'Nuevo':   'bg-green-500',
    'Oferta':  'bg-red-500',
    'Popular': 'bg-blue-500',
    'Agotado': 'bg-gray-500',
  };

  const resolvedBadge = stock === 0 ? 'Agotado' : badge;

  const handleAddToCart = async () => {
    if (stock === 0) return;
    await addToCart({ id, name, price, image: img, stock });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group overflow-hidden border-2 border-gray-100 hover:border-amber-400 transition-all duration-300 hover:shadow-xl rounded-xl bg-white flex flex-col">

      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50">
        {resolvedBadge && (
          <span className={`absolute top-2 left-2 z-10 text-white text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded shadow ${badgeColor[resolvedBadge] ?? 'bg-slate-500'}`}>
            {resolvedBadge}
          </span>
        )}

        <button onClick={() => setIsFav(f => !f)}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:bg-gray-50 transition-colors">
          <FiHeart className={`w-3 h-3 md:w-4 md:h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Imagen clickeable */}
        <Link to={`/products/${id}`}>
          <div className="aspect-square overflow-hidden">
            <img src={img} alt={name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-3 md:p-4" />
          </div>
        </Link>

        {stock > 0 && stock < 6 && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-[10px] py-1 px-2 flex items-center justify-center gap-1">
            <FiClock className="w-2.5 h-2.5" />
            ¡Solo {stock} unidades!
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2 md:p-4 flex flex-col gap-1 md:gap-2 flex-1">
        {/* Rating — oculto en mobile para ahorrar espacio */}
        <div className="hidden md:flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2rem] md:min-h-[2.5rem]">
          {name}
        </p>

        <p className="text-sm md:text-xl font-bold text-slate-800">{formatPrice(price)}</p>

        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`mt-auto w-full flex items-center justify-center gap-1 md:gap-2 text-white text-xs md:text-sm font-medium py-2 md:py-2.5 rounded-lg transition-colors duration-300
            ${added ? 'bg-green-500' : 'bg-slate-800 hover:bg-amber-400 disabled:bg-gray-300'}`}
        >
          <FiShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">
            {stock === 0 ? 'Agotado' : added ? '¡Agregado!' : 'Añadir al Carrito'}
          </span>
          <span className="sm:hidden">
            {stock === 0 ? 'Agotado' : added ? '✓' : 'Añadir'}
          </span>
        </button>
      </div>
    </div>
  );
};