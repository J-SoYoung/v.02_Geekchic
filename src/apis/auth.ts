import { GoogleAuthProvider } from 'firebase/auth';
import { auth, database, signInWithPopup, signOut } from './firebase';
import { get, ref, set } from 'firebase/database';
import { UserDataType } from '../types/userType';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        const newUser: UserDataType = {
          _id: user.uid,
          username: user.displayName || '',
          email: user.email || '',
          avatar: user.photoURL || '',
          serviceJoin: new Date().toISOString(),
          phone: '',
          address: '',
        };
        await set(userRef, newUser);
        console.log('User created in database:', newUser);
        return newUser;
      } else {
        console.log('User already exists in database:', userSnapshot.val());
        return userSnapshot.val();
      }
    }
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
