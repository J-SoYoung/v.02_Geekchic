import Chevron_left from '@/assets/icons/chevron_left.svg';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/atoms';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}
export const MyPageLayout = ({ children, title }: LayoutProps) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <>
      <header className='p-8 text-left '>
        {location.pathname.startsWith('/my') && (
          <img
            src={Chevron_left}
            alt='이전 페이지로'
            className='w-10 h-10 cursor-pointer '
            onClick={() =>
              location.pathname.startsWith('/message')
                ? navigate(`/my/${user && user._id}/messageList`, {
                    state: { messages: '메세지넘긴다' },
                  })
                : navigate(`/my/${user && user._id}`)
            }
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
