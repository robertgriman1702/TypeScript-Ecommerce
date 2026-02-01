import { FeatureGrid } from '../components/Home/FeatureGrid';
import { ProductGrid } from '../components/Home/ProductGrid';
import { prepareProducts } from '../components/helpers';
import { products } from '../Data/initialData.ts';

export const HomePage = () => {
	// Sin hooks externos: usamos initialData como fuente local
	const isLoading = false;
  if (isLoading) return <div>Cargando...</div>;
	const recentProductsRaw = products.slice(0, 4);
	const popularProductsRaw = products.slice(4, 8);

	const preparedRecentProducts = prepareProducts(recentProductsRaw);
	const preparedPopularProducts = prepareProducts(popularProductsRaw);

	return (
		<div>
			<FeatureGrid />

			<ProductGrid title='Nuevos Productos' products={preparedRecentProducts} />

			<ProductGrid
				title='Productos Destacados'
				products={preparedPopularProducts}
			/>
		</div>
	);
};