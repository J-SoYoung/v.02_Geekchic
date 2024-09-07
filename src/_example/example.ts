import { UsedProductType } from "@/_typesBundle/productType";

export const defaultImage = 'https://via.placeholder.com/150';

export const initlUsedProduct: UsedProductType = {
  createdAt: '',
  description: '',
  id: '',
  images: [],
  isSales: false,
  productName: '',
  deliveryCharge: true, // false배송비 비포함, true배송비 포함
  conditions: 'new', // new새상품, used중고상품
  price: '',
  quantity: 1,
  size: '',
  seller: {
    _id: '',
    username: '',
    email: '',
    avatar: '',
    serviceJoinDate: '',
    phone: '',
    address: '',
  },
};
export const usedProduct = {
  createdAt: '2024-08-27',
  description:
    'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonumm',
  id: '18b71278-197b-4ed3-9be6-3670962353d4',
  images: [defaultImage, defaultImage, defaultImage],
  isSales: true,
  productName: 'tyekd 배색 카라티 ',
  deliveryCharge: false, // false배송비 비포함, true배송비 포함
  conditions: 'new', // new새상품, used중고상품
  price: '42000',
  quantity: 1,
  seller: {
    nickname: 'soyoung jung',
    sellerId: 'x9vChpE8FBRiOUdCZImC35g3CzJ2',
    userAvatar:
      'https://lh3.googleusercontent.com/a/ACg8ocKP0FpYTme_3LWQEBuw0J2I1fu2L5qAYZxpBq0SOb9MMVrQ7g=s96-c',
    userName: 'soyoung jung',
    address: '인천시 인천시 인천시',
  },
  size: 'free',
};
export const product = {
  createdAt: '2024-08-27',
  category: 'top',
  description:
    'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. ',
  images: [defaultImage, defaultImage, defaultImage],
  isSales: true,
  productName: 'dienogad_GOLF_T ',
  price: '230000',
  quantity: 1,
  size: 'free',
};
