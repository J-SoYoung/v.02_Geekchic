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
// 결제 타입
interface PaymentsProductItemsType {
  cartId: string;
  description: string;
  image: string;
  price: number;
  productName: string;
  productId: string;
  quantity: number;
  size: string;
}
interface PaymentsDataType {
  paymentsId: string;
  totalAmount: number;
  userId: string;
  paymentsProductItems: PaymentsProductItemsType[];
}
interface PaymentsDataInfoType {
  createdAt: string[];
  paymentMethod: string;
  paymentsData: PaymentsDataType;
  buyerInfo: {
    buyerName: string;
    address: string;
    phone: string;
  };
}

interface CommentType {
  commentId?: string;
  userId: string;
  username: string;
  avatar: string;
  comment: string;
  createdAt: string[];
}

export type {
  ProductType,
  CartItemType,
  PaymentsProductItemsType,
  PaymentsDataType,
  PaymentsDataInfoType,
  CommentType
};
