import { useState } from 'react';
import Loginlogo from '@assets/rootImage/loginLogo.png';

export const Login = () => {
  const [localUser, setLocalUser] = useState(false);
  
  const onClickLogin = () => {};
  const onClickLogout = () => {};

  return (
    <div>
      <div className='flex justify-center border'>
        <img className='w-[500px] h-[440px] mb-[80px]' src={Loginlogo} alt='loginLogo' />
      </div>
      <div className='mb-[15px]'>
        <button
          className='bg-white text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black'
          onClick={!localUser ? onClickLogin : onClickLogout}
        >
          <img className='inline w-[38px] h-[38px]' src='/public/img/googleLogo.png' alt='googleLogo' />
          {!localUser ? 'Google로 로그인' : 'Google 로그아웃'}
        </button>
      </div>
    </div>
  );
};
