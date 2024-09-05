import { useRecoilValue } from 'recoil';
import { userState } from '@/_recoil/atoms';
import { UserDataType } from '@/_typesBundle/userType';
import { BottomNavLinkComp } from './BottomNavLinkComp';

// icon import
import HomeIcon from '@assets/nav_icons/nav_home.svg';
import HomeActIcons from '@assets/nav_icons/nav_homeActive.svg';
import ItemsIcon from '@assets/nav_icons/nav_items.svg';
import ItemsActIcons from '@assets/nav_icons/nav_itemsActive.svg';
import WishIcon from '@assets/nav_icons/nav_wish.svg';
import WishActIcons from '@assets/nav_icons/nav_wishActive.svg';
import UsedIcon from '@assets/nav_icons/nav_used.svg';
import UsedActIcon from '@assets/nav_icons/nav_usedActive.svg';
import MyIcon from '@assets/nav_icons/nav_my.svg';
import MyActIcon from '@assets/nav_icons/nav_myActive.svg';

const BottomNav = () => {
  const user = useRecoilValue<UserDataType | null>(userState);

  return (
    <nav className='fixed bottom-0 mx-auto w-[598px] max-w-[597px] border-t-2 bg-[#fff]'>
      <ul className='flex justify-around p-4'>
        <BottomNavLinkComp
          router='/'
          icons={HomeIcon}
          actIcons={HomeActIcons}
          pageName={'홈'}
        />
        <BottomNavLinkComp
          router='/products'
          icons={ItemsIcon}
          actIcons={ItemsActIcons}
          pageName={'상품'}
        />
        <BottomNavLinkComp
          router={`/wishlist/${user?._id}`}
          icons={WishIcon}
          actIcons={WishActIcons}
          pageName={'관심물품'}
        />
        <BottomNavLinkComp
          router='/used'
          icons={UsedIcon}
          actIcons={UsedActIcon}
          pageName={'중고거래'}
        />
        <BottomNavLinkComp
          router={`/my/${user?._id}`}
          icons={MyIcon}
          actIcons={MyActIcon}
          pageName={'마이'}
        />
      </ul>
    </nav>
  );
};

export default BottomNav;
