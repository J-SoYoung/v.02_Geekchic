import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, ref, set } from 'firebase/database';
import { useRecoilState } from 'recoil';
import { FcGoogle } from 'react-icons/fc';

import Loginlogo from '@assets/rootImage/loginLogo.png';
import { signInWithGoogle, signOutFromGoogle } from '@apis/userApis';
import { getEmptyUserData, userState } from '@recoil/atoms';
import { UserDataType } from '@typesBundle/userType';
import { database } from '@apis/firebase';

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState<UserDataType>(userState);
  const [loginError, setLoginError] = useState(false);

  const onClickLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        // firebase 유저검색 및 저장, recoil저장
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.val());
        } else {
          const newUser: UserDataType = {
            _id: user.uid,
            username: user.displayName || '',
            email: user.email || '',
            avatar: user.photoURL || '',
            serviceJoinDate: new Date().toISOString(),
            phone: '',
            address: '',
          };
          await set(userRef, newUser);
          setUserData(newUser);
        }
      }
      navigate('/used');
    } catch (error) {
      console.error('Logout failed:', error);
      setLoginError(true);
    }
  };

  const onClickLogout = async () => {
    if (confirm('정말 로그아웃 하시겠습니까?>')) {
      try {
        await signOutFromGoogle();
        setUserData(getEmptyUserData());
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <main>
      <section className='flex justify-center'>
        <img
          className='w-[500px] h-[440px] my-16' src={Loginlogo} alt='loginLogo' />
      </section>
      <section className='px-20'>
        <button
          className='w-full h-[50px] flex items-center justify-center mb-2 rounded-md bg-white hover:brightness-90 border border-black'
          onClick={userData ? onClickLogout : onClickLogin}
        >
          <FcGoogle className='mr-1 w-6 h-6' />
          {userData ? 'Google 로그아웃' : 'Google로 로그인'}
        </button>
        {loginError && (
          <p className='font-bold text-red-600'>로그인을 다시 시도해주세요</p>
        )}
      </section>
    </main>
  );
};
