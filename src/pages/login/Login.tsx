import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { User } from 'firebase/auth';

import { LoginButton } from '@/components/button/LoginButton';
import { UserDataType } from '@/_typesBundle';
import { loginLogo } from '@/_assets';
import { signInWithGoogle, signOutFromGoogle, getUserData } from '@/_apis';
import { getEmptyUserData, userState } from '@/_recoil';

export const Login = () => {
  const navigate = useNavigate();
  const [isTriggerQuery, setIsTriggerQuery] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [userData, setRecoilUserData] = useRecoilState<UserDataType>(userState);
  const [loginError, setLoginError] = useState(false);

  const { data: user, isPending } = useQuery({
    queryKey: ['user', googleUser?.uid],
    queryFn: async () => {
      if (googleUser) {
        return await getUserData(googleUser);
      }
    },
    enabled: isTriggerQuery && !!googleUser,
  });

  useEffect(() => {
    if (user && !isPending) {
      setRecoilUserData(user);
      navigate('/used');
    }
  }, [user, isPending, setRecoilUserData]);

  const onClickLogin = async () => {
    try {
      const googleLogin = await signInWithGoogle();
      googleLogin && setGoogleUser(googleLogin);
      setIsTriggerQuery(true);
    } catch (error) {
      console.error('Logout failed:', error);
      setLoginError(true);
    }
  };

  const onClickLogout = async () => {
    if (confirm('정말 로그아웃 하시겠습니까?>')) {
      try {
        await signOutFromGoogle();
        setRecoilUserData(getEmptyUserData());
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
          src={loginLogo}
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
