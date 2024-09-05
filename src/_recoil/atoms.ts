import { atom } from 'recoil';
import { UserDataType } from '@/_typesBundle/userType';

// 유저 데이터 초기화
export const getEmptyUserData = (): UserDataType => ({
  _id: '',
  address: '',
  avatar: '',
  email: '',
  phone: '',
  serviceJoinDate: '',
  username: '',
});

export const userState = atom<UserDataType>({
  key: 'userState',
  default: {
    _id: '',
    address: '',
    avatar: '',
    email: '',
    phone: '',
    serviceJoinDate: '',
    username: '',
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
