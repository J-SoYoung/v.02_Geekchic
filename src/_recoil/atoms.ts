import { atom } from 'recoil';
import { ProductType, UserDataType } from '@/_typesBundle';

// 유저 데이터 초기화
export const getEmptyUserData = (): UserDataType => ({
  _id: '',
  address: '',
  avatar: '',
  email: '',
  phone: '',
  serviceJoinDate: ['',''],
  username: '',
  listCarts: 0,
  listMessages: [],
  listPurchases: 0,
  listSells: 0,
});

export const userState = atom<UserDataType>({
  key: 'userState',
  default: {
    _id: '',
    address: '',
    avatar: '',
    email: '',
    phone: '',
    serviceJoinDate: ['',''],
    username: '',
    listCarts: 0,
    listMessages: [],
    listPurchases: 0,
    listSells: 0,
  },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem('userState');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue != null) {
          localStorage.setItem('userState', JSON.stringify(newValue));
        } else {
          localStorage.removeItem('userState');
        }
      });
    },
  ],
});

// export const userState = atom<UserDataType | null>({
//   key: 'userState', // unique ID
//   default: null,
// });
