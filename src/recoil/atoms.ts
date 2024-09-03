import { atom } from 'recoil';
import { UserDataType } from '../types/userType';

export const userState = atom<UserDataType | null>({
  key: 'userState',
  default: null,
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
