import { ErrorImg } from '@/_assets';
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ErrorPageReload = ({
  content,
  pageName,
  linkTo,
  movePage,
}: {
  content: string | ReactNode;
  pageName: string;
  linkTo?: string;
  movePage?: string;
}) => {

  return (
    <div className='min-h-screen px-8 flex flex-col justify-center text-center'>
      <p className='mb-4 text-[#8b3ecf] text-5xl font-bold'>ERROR</p>

      <p>{content}</p>
      <button
        className='cursor-pointer hover:font-bold hover:text-[#8b3ecf]'
        onClick={() => window.location.reload()}
      >
        GeekChic {pageName} 페이지 새로고침
      </button>
      <img
        className='my-8 rounded-lg'
        src={ErrorImg}
        alt='페이지를 새로고침 해주세요'
      />

      {linkTo && (
        <div className='px-2 py-1 bg-gray-200 rounded-full text-s'>
          <Link to={linkTo} className='hover:font-bold'>
            {movePage}로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
};
