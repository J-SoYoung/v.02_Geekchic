import { FcGoogle } from 'react-icons/fc';

interface LoginButtonProps {
  onClickFunc: () => void;
  text: string;
}

export const LoginButton = ({ onClickFunc, text }: LoginButtonProps) => {
  return (
    <button
      className='w-full h-[50px] flex items-center justify-center mb-2 rounded-md bg-white hover:brightness-90 border border-black'
      onClick={onClickFunc}
    >
      <FcGoogle className='mr-1 w-6 h-6' />
      {text}
    </button>
  );
};
