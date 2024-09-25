import { UsedProductType } from '@/_typesBundle';
import { UserDataType } from '@/_typesBundle';

export const defaultImage = 'https://via.placeholder.com/150';

export const initUserData: UserDataType = {
  _id: '',
  username: '',
  email: '',
  avatar: '',
  serviceJoinDate:  ['',''],
  phone: '',
  address: '',
  listCarts: 0,
  listMessages: [],
  listPurchases: 0,
  listSells: 0,
};

export const initlUsedProduct: UsedProductType = {
  createdAt: ['',''],
  description: '',
  id: '',
  images: [],
  isSales: false,
  productName: '',
  deliveryCharge: 'include', // notInclude 배송비 비포함, include 배송비 포함
  conditions: 'new', // new새상품, used중고상품
  price: 0,
  quantity: 1,
  size: '',
  seller: {
    _id: '',
    username: '',
    email: '',
    avatar: '',
    serviceJoinDate: [],
    phone: '',
    address: '',
  },
};
