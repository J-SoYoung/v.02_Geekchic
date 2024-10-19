import { Icon_Chevron_left } from '@/_assets';
import { useNavigate } from 'react-router-dom';

export const BackToMoveButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className='w-10 h-10 fixed top-2 cursor-pointer'
      onClick={() => navigate(-1)}
    >
      <img src={Icon_Chevron_left} alt='이전 페이지로' className='w-full' />
    </button>
  );
};