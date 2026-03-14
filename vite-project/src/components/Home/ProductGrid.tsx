import type { PreparedProducts } from '../../interfaces/product.interface';
import { CardProduct } from '../products/CardProduct';
import { FiTag, FiStar, FiTrendingUp } from 'react-icons/fi';

interface Props {
  title: string;
  products: PreparedProducts[];
  showTabs?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { key: 'nuevos',     label: 'Nuevos',       icon: FiTag },
  { key: 'destacados', label: 'Destacados',    icon: FiStar },
  { key: 'populares',  label: 'Más Vendidos',  icon: FiTrendingUp },
];

export const ProductGrid = ({ title, products, showTabs, activeTab, onTabChange }: Props) => {
  return (
    <section className="py-16 bg-gray-50 rounded-2xl my-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-12">

        {/* Header */}
        {title && (
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <FiTag className="w-3 h-3" />
              Descubre Nuestros Productos
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              La mejor selección de papelería y artículos de oficina al mejor precio
            </p>
          </div>
        )}

        {/* Tabs */}
        {showTabs && onTabChange && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-white border-2 border-gray-200 rounded-xl p-1.5 shadow-lg gap-1">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => onTabChange(t.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                    ${activeTab === t.key
                      ? 'bg-slate-800 text-white shadow'
                      : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              price={product.price}
              img={product.image}
              id={product.id}
              stock={product.stock}
            />
          ))}
        </div>

      </div>
    </section>
  );
};