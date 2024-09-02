import { Link } from 'react-router-dom';

interface BottomNavLinkCompProp {
  router: string;
  icons: string;
  actIcons: string;
  pageName: string;
}

export const BottomNavLinkComp = ({ router, icons, actIcons, pageName }: BottomNavLinkCompProp) => {
  return (
    <Link to={router} className='text-center cursor-pointer'>
      <img src={location.pathname === router ? actIcons : icons} alt='Home' className='w-6 h-6 mx-auto' />
      <span className='text-xs'>{pageName}</span>
    </Link>
  );
};
