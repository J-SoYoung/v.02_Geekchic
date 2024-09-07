import Chevron_left from '@/_assets/icons/chevron_left.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@/_recoil/atoms';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onClickFunc?: () => void;
}
export const Layout = ({ children, title, onClickFunc }: LayoutProps) => {
  const user = useRecoilValue(userState);

  return (
    <>
      <header className='p-8 text-left '>
        {onClickFunc && (
          <img
            src={Chevron_left}
            alt='이전 페이지로'
            className='w-10 h-10 cursor-pointer '
            onClick={onClickFunc}
          />
        )}
        <h1
          className={`text-3xl font-bold text-center mb-5 mt-5  
          ${location.pathname === `/my/${user && user._id}` && 'pt-10'}`}
        >
          {title}
        </h1>
      </header>

      <main>{children}</main>
    </>
  );
};
