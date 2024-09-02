import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>에러가 발생햇습니다</p>
    </div>
  );
}
