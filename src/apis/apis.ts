import { get, ref, set } from 'firebase/database';
import { database } from './firebase';
import { UserDataType } from '../types/userType';

export async function loadUserData(uid: string): Promise<UserDataType | null> {
  console.log('firebase', uid);
  const userRef = ref(database, `userData/${uid}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    console.log(snapshot.val());
    return snapshot.val() as UserDataType;
  } else {
    return null;
  }
}

export async function createNewUser(newUser: UserDataType): Promise<UserDataType | null> {
  const userRef = ref(database, `userData/${newUser._id}`);
  await set(userRef, newUser);
  return newUser;
}
