import { UserDataType } from './userType';

type UsedProductSellerType = Omit<
  UserDataType,
  'listCarts' | 'listMessages' | 'listPurchases' | 'listSells'
>;

interface UsedProductType {
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  isSales: boolean;
  productName: string;
  deliveryCharge: boolean; // false배송비 비포함, true배송비 포함
  conditions: 'new' | 'used'; // new새상품, used중고상품
  price: number;
  quantity: number;
  seller: UsedProductSellerType;
  size: string;
}

//⭕판매목록의 id랑 제품 id랑 같아도 되는거 아닌가?
interface SellsItemType {
  image: string;
  isSales: boolean;
  price: number;
  productName: string;
  quantity: number;
  uploadDate: string;
  usedProductId: string; // 판매목록id === 제품id
  userId: string;
  sellsQuantity: number;
}

interface CommentType {
  commentId?: string;
  userId: string;
  username: string;
  avatar: string;
  comment: string;
  createdAt: string;
}

export type { UsedProductType, CommentType, SellsItemType };
