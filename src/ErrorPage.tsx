import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id='error-page' className='App min-h-screen w-[600px]'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>에러가 발생햇습니다</p>
      <Link to={'/'}>GeekChic 메인 페이지로 돌아가기</Link>
    </div>
  );
}
 