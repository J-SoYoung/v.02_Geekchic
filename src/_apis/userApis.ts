import { GoogleAuthProvider, User } from 'firebase/auth';
import { auth, database, signInWithPopup, signOut } from './firebase';
import { UserDataType } from '@/_typesBundle';
import { get, ref, set } from 'firebase/database';
import { SetterOrUpdater } from 'recoil';
import { utcToKoreaTimes } from '@/_utils';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
};

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign-Out Error:', error);
    throw error;
  }
};

export const getUserData = async (user: User): Promise<UserDataType | null> => {
  try {
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return (await snapshot.val()) as UserDataType;
    } else {
      const newUser = await createNewUser(user);
      return newUser;
    }
  } catch (error) {
    console.error('유저 데이터 로드 에러', error);
    return null;
  }
};

export const createNewUser = async (
  user: User,
): Promise<UserDataType | null> => {
  try {
    const newUser: UserDataType = {
      _id: user.uid,
      username: user.displayName || '',
      email: user.email || '',
      avatar: user.photoURL || '',
      serviceJoinDate: utcToKoreaTimes(),
      phone: '',
      address: '',
      listCarts: 0,
      listMessages: [],
      listPurchases: 0,
      listSells: 0,
    };
    const userRef = ref(database, `users/${newUser._id}`);
    await set(userRef, newUser);
    return newUser as UserDataType;
  } catch (error) {
    console.error('새 유저 데이터 생성 에러', error);
    return null;
  }
};

export async function editUserProfileData(
  updatedUser: UserDataType,
  setUser: SetterOrUpdater<UserDataType>,
) {
  try {
    const userEditRef = ref(database, `users/${updatedUser._id}`);
    await set(userEditRef, updatedUser);
    setUser(updatedUser);
  } catch (err) {
    console.error('Error 유저 프로필 수정');
  }
}
// export async function editUserProfileDatas(
//   updatedUser: UserDataType,
// ) {
//   try {
//     const userEditRef = ref(database, `users/${updatedUser._id}`);
//     await set(userEditRef, updatedUser);
//   } catch (err) {
//     console.error('Error 유저 프로필 수정');
//   }
// }
