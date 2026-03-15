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
    <section className="py-8 md:py-16 bg-gray-50 rounded-2xl my-4 md:my-8">
      <div className="max-w-7xl mx-auto px-3 md:px-5 lg:px-12">

        {title && (
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-flex items-center gap-1 bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 md:mb-4">
              <FiTag className="w-3 h-3" />
              Descubre Nuestros Productos
            </span>
            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-gray-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
              La mejor selección de papelería y artículos de oficina al mejor precio
            </p>
          </div>
        )}

        {showTabs && onTabChange && (
          <div className="flex justify-start md:justify-center mb-6 md:mb-10 overflow-x-auto pb-1">
            <div className="flex bg-white border-2 border-gray-200 rounded-xl p-1 md:p-1.5 shadow-lg gap-1 flex-shrink-0">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => onTabChange(t.key)}
                  className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                    ${activeTab === t.key
                      ? 'bg-slate-800 text-white shadow'
                      : 'text-gray-500 hover:text-gray-800'
                    }`}
                >
                  <t.icon className="w-3 h-3 md:w-4 md:h-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2 columnas en mobile, 4 en desktop */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
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