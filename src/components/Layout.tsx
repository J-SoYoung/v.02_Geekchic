import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Icon_Chevron_left } from '@/_assets';
import { userState } from '@/_recoil';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onClickFunc?: () => void;
}
export const Layout = ({ children, title, onClickFunc }: LayoutProps) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const onClickMoveToBack = () => {
    if (location.pathname !== `/my/${user._id}`) navigate(-1);
  };
  return (
    <>
      <header className='p-8 text-left '>
        {location.pathname !== `/my/${user._id}` && (
          <img
            src={Icon_Chevron_left}
            alt='이전 페이지로'
            className='w-10 h-10 cursor-pointer '
            onClick={onClickFunc ? onClickFunc : onClickMoveToBack}
          />
        )}

        <h1
          className={`text-3xl font-bold text-center mb-5 mt-5  
          ${location.pathname === `/my/${user && user._id}` && 'pt-10'}`}
        >
          {title}
        </h1>
      </header>

      <main className='p-8'>{children}</main>
    </>
  );
};
