import { UserDataType } from './userType';

export interface UsedProductsType {
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  isSales: boolean;
  productName: string;
  deliveryCharge: boolean; // false배송비 비포함, true배송비 포함
  conditions: 'new' | 'used'; // new새상품, used중고상품
  price: string;
  quantity: number;
  seller: UserDataType;
  size: string;
}
