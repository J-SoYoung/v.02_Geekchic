import { Link, useLocation } from 'react-router-dom';

interface BottomNavLinkCompProp {
  router: string;
  icons: string;
  actIcons: string;
  pageName: string;
}

export const BottomNavLinkComp = ({ router, icons, actIcons, pageName }: BottomNavLinkCompProp) => {
  const location = useLocation();
  const isActive = location.pathname === router;
  
  return (
    <Link to={router} className='text-center cursor-pointer'>
      <img src={isActive ? actIcons : icons} alt='Home' className='w-6 h-6 mx-auto' />
      <span className='text-xs'>{pageName}</span>
    </Link>
  );
};
