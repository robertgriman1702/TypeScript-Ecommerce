import { useState, useEffect } from 'react';

import { ProductGrid } from '../components/Home/ProductGrid.tsx';
import { prepareProducts } from '../components/helpers/index.ts';
import type { InitialProduct } from '../interfaces/product.interface';

export const HomePage = () => {
  const [products, setProducts] = useState<InitialProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('nuevos');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/productos`);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) return <div className="text-center my-20 text-2xl">Cargando catálogo...</div>;
  if (error)     return <div className="text-center my-20 text-red-500">{error}</div>;

  // Dividimos los productos por tab
  const tabProducts: Record<string, ReturnType<typeof prepareProducts>> = {
    nuevos:     prepareProducts(products.slice(0, 4)),
    destacados: prepareProducts(products.slice(4, 8)),
    populares:  prepareProducts(products.slice(0, 4).reverse()), 
    };

  return (
    <div>

      <ProductGrid
        title="Catálogo de Productos"
        products={tabProducts[activeTab]}
        showTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};