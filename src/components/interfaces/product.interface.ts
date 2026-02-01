export interface InitialProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	stock: number;
}

export type Product = InitialProduct;
export type PreparedProducts = InitialProduct;