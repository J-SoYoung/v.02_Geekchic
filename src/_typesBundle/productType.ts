interface ProductType {
  categories: '' | 'outer' | 'top' | 'bottom' | 'shoes' | 'acc';
  createdAt: string[];
  description: string;
  id: string;
  images: string[];
  productName: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartItemType {
  cartId: string;
  categories: string;
  createdAt: string[];
  description: string;
  id: string;
  images: string[];
  price: number;
  productName: string;
  quantity: number;
  selectedQuantity: number;
  size: string;
}

export type { ProductType, CartItemType };
