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

export type { ProductType };
