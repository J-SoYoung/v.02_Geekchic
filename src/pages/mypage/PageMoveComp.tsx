import { Link } from 'react-router-dom';

interface PageMoveCompType {
  url: string;
  title: string;
  listLength: number | [];
}

export const PageMoveComp = ({ url, title, listLength }: PageMoveCompType) => {
  return (
    <Link
      to={url}
      className='flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer'
    >
      <span className='text-lg'>{title}</span>
      <span className='text-lg font-semibold'>{listLength}</span>
    </Link>
  );
};
