import { GoogleAuthProvider } from 'firebase/auth';
import { auth, database, signInWithPopup, signOut } from './firebase';
import { UserDataType } from '@/_typesBundle/userType';
import { get, ref, set } from 'firebase/database';
import { SetterOrUpdater } from 'recoil';

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

export async function loadUserData(uid: string): Promise<UserDataType | null> {
  const userRef = ref(database, `userData/${uid}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    console.log(snapshot.val());
    return snapshot.val() as UserDataType;
  } else {
    return null;
  }
}

export async function createNewUser(
  newUser: UserDataType,
): Promise<UserDataType | null> {
  const userRef = ref(database, `userData/${newUser._id}`);
  await set(userRef, newUser);
  return newUser;
}

export async function editUserProfileData(
  updatedUser: UserDataType,
  setUser: SetterOrUpdater<UserDataType>,
) {
  try {
    const userEditRef = ref(database, `userData/${updatedUser._id}`);
    await set(userEditRef, updatedUser);
    setUser(updatedUser);
  } catch (err) {
    console.error('Error 유저 프로필 수정');
  }
}
