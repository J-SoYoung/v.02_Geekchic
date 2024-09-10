import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, ref, set } from 'firebase/database';
import { useRecoilState } from 'recoil';

import { UserDataType } from '@/_typesBundle';
import { LoginButton } from '@/components/button/LoginButton';
import Loginlogo from '@assets/rootImage/loginLogo.png';
import { database } from '@/_apis/firebase';
import { signInWithGoogle, signOutFromGoogle } from '@/_apis/userApis';
import { getEmptyUserData, userState } from '@/_recoil/atoms';

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState<UserDataType>(userState);
  const [loginError, setLoginError] = useState(false);

  const onClickLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        // ⭕ userApis로 옮기기 
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
            listCarts: 0,
            listMessages: 0,
            listPurchases: 0,
            listSells: 0,
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
        console.error('로그아웃 실패:', error);
      }
    }
  };

  return (
    <main>
      <section className='flex justify-center'>
        <img
          className='w-[500px] h-[440px] my-16'
          src={Loginlogo}
          alt='loginLogo'
        />
      </section>
      <section className='px-20'>
        {userData._id == '' ? (
          <LoginButton onClickFunc={onClickLogin} text='Google로 로그인' />
        ) : (
          <LoginButton onClickFunc={onClickLogout} text='Google 로그아웃' />
        )}
        {loginError && (
          <p className='font-bold text-red-600'>로그인을 다시 시도해주세요</p>
        )}
      </section>
    </main>
  );
};
