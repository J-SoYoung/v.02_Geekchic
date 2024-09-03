import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle, signOutFromGoogle } from '@apis/auth';
import Loginlogo from '@assets/rootImage/loginLogo.png';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const onClickLogin = async () => {
    
    try {
      const user = await signInWithGoogle();
      setUserData(user);
      navigate('/used')
    } catch (error) {
      console.error('Logout failed:', error);
      setLoginError(true);
    }
  };

  const onClickLogout = async () => {
    try {
      await signOutFromGoogle();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <main>
      <section className='flex justify-center'>
        <img className='w-[500px] h-[440px] my-16' src={Loginlogo} alt='loginLogo' />
      </section>
      <section className='px-20'>
        <button
          className='w-full h-[50px] flex items-center justify-center mb-2 rounded-md bg-white hover:brightness-90 border border-black'
          onClick={userData ? onClickLogout : onClickLogin}
        >
          <FcGoogle className='mr-1 w-6 h-6' />
          {userData ? 'Google 로그아웃' : 'Google로 로그인'}
        </button>
        {loginError && <p className='font-bold text-red-600'>로그인을 다시 시도해주세요</p>}
      </section>
    </main>
  );
};
