import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/Home/ProductGrid.tsx';
import { prepareProducts } from '../components/helpers/index.ts';
import type { InitialProduct } from '../interfaces/product.interface';

// Quita acentos, signos y pasa a minúsculas
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')                     // descompone letras con acento
    .replace(/[\u0300-\u036f]/g, '')      // elimina los diacríticos (tildes, etc.)
    .replace(/[^a-z0-9\s]/g, '');        // elimina signos como ¡ ! ¿ ? etc.

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const busquedaURL = searchParams.get('search') || '';
  const categoriaURL = searchParams.get('category') || 'Todas';

  const [allProducts, setAllProducts] = useState<InitialProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<InitialProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      let result = allProducts;

      if (categoriaURL !== 'Todas') {
        result = result.filter(p => normalize(p.category) === normalize(categoriaURL));
      }

      if (busquedaURL.trim() !== '') {
        const termino = normalize(busquedaURL);
        result = result.filter(p => normalize(p.name).includes(termino));
      }

      setFilteredProducts(result);
    }
  }, [allProducts, busquedaURL, categoriaURL]);

  if (isLoading) return <div className="text-center my-20 text-2xl">Cargando inventario...</div>;

  const preparedProducts = prepareProducts(filteredProducts);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        {busquedaURL ? `Resultados para: "${busquedaURL}"` : "Catálogo Completo"}
      </h1>

      {preparedProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No encontramos productos con esa descripción.</p>
      ) : (
        <ProductGrid title="" products={preparedProducts} />
      )}
    </div>
  );
};