import { useRecoilValue } from 'recoil';

import { userState } from '@/_recoil';
import { Icon_King } from '@/_assets';


export const SellerMark = ({ sellerId }: { sellerId: string }) => {
  const loginUser = useRecoilValue(userState);
  if (sellerId && sellerId == loginUser._id)
    return (
      <div className='w-6 h-6 absolute top-0 right-0 '>
        <img
          src={Icon_King}
          className='w-4 h-4'
          alt='유저가 판매자'
        />
      </div>
    );
};
