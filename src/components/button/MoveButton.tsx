import { Link } from 'react-router-dom';

interface MoveButtonProps {
  text: string;
  url: string;
}

export const MoveButton = ({ text, url }: MoveButtonProps) => {
  return (
    <button className='w-[100px] h-[50px] mb-5 ml-2 bg-black text-center text-white rounded-md '>
      <Link to={url}>{text}</Link>
    </button>
  );
};
