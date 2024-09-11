import { useRecoilValue } from 'recoil';

import { BottomNavLinkComp } from './BottomNavLinkComp';
import { userState } from '@/_recoil';
import { UserDataType } from '@/_typesBundle';

// icon import
import {
  HomeIcon,
  HomeActIcons,
  ItemsIcon,
  ItemsActIcons,
  WishIcon,
  WishActIcons,
  UsedIcon,
  UsedActIcon,
  MyIcon,
  MyActIcon,
} from '@/_assets';

export const BottomNav = () => {
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

