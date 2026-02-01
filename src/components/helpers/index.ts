import type { Product as InitialProduct } from '../interfaces/product.interface';

// Formatear precio
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Preparar productos (para initialData no transformamos gran cosa, pero queda extensible)
export const prepareProducts = (products: InitialProduct[]) => {
  return products.map((p) => ({
    ...p,
    // Mantener la estructura simple: image en singular, price ya existe, stock ya existe
  }));
};