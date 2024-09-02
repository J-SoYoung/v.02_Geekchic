import { useState } from 'react';
// image, icon
import { FcGoogle } from "react-icons/fc";
import Loginlogo from '@assets/rootImage/loginLogo.png';

export const Login = () => {
  const [localUser, setLocalUser] = useState(false);

  const onClickLogin = () => {};
  const onClickLogout = () => {};

  return (
    <main>
      <section className='flex justify-center'>
        <img className='w-[500px] h-[440px] my-16' src={Loginlogo} alt='loginLogo' />
      </section>
      <section className='px-20'>
        <button
          className='w-full h-[50px] flex items-center justify-center mb-2 rounded-md bg-white hover:brightness-90 border border-black'
          onClick={!localUser ? onClickLogin : onClickLogout}
        >
          <FcGoogle className='mr-1 w-6 h-6'/>
          {!localUser ? 'Google로 로그인' : 'Google 로그아웃'}
        </button>
      </section>
    </main>
  );
};
