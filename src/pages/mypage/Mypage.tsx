import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { getEmptyUserData, userState } from '@/_recoil/atoms';
import { signOutFromGoogle } from '@/_apis/userApis';
import { MyPageLayout } from '@components/MyPageLayout';
import { BasicButton } from '@/components/button/BasicButton';

// ⭕ 마이페이지 4개탭 -> 공통컴포넌트로
export const Mypage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const onClickMoveProfile = () => {
    navigate(`/my/profile/${user?._id}`);
  };

  const onClickLogout = async () => {
    if (confirm('로그아웃 하시겠습니까? ')) {
      await signOutFromGoogle();
      setUser(getEmptyUserData());
      navigate('/login');
    }
  };

  return (
    <MyPageLayout title='마이페이지'>
      <div className='m-16 p-4'>
        {/* 프로필 관리 */}
        <div className='mb-12 border-b-2'>
          <div className='flex items-center mb-8 mx-auto'>
            <div className='w-16 h-16 bg-gray-200 rounded-full'>
              <img
                src={(user && user.avatar) || ''}
                alt={(user && user.username) || ''}
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='ml-4 text-left'>
              <div className='text-lg font-semibold'>
                {user && user.username}
              </div>
              <div className='text-sm text-gray-500'>
                {user && user.address ? user.address : '주소를 작성해주세요'}
              </div>
            </div>
          </div>
          <BasicButton
            onClickFunc={onClickMoveProfile}
            text='프로필 관리'
            bg='bg-[#8F5BBD]'
          />
          <BasicButton
            onClickFunc={onClickLogout}
            text='로그아웃'
            bg='bg-[#adb5bd]'
          />
        </div>

        <div>
          {/* 내 상품 관리 */}
          <div className='space-y-4 pb-12 mb-8 border-b-2'>
            <Link
              to={`/my/purchasesList/${user?._id}`}
              state={{ user: user }}
              className='flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer'
            >
              <span className='text-lg'>구매내역</span>
              {/* <span className='text-lg font-semibold'>{makeArr(user.orders).length}</span> */}
            </Link>
            <Link
              to={`/my/salesList/${user?._id}`}
              state={{ user }}
              className='flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer'
            >
              <span className='text-lg'>판매목록</span>
              {/* <span className='text-lg font-semibold'>{makeArr(user.sales).length}</span> */}
            </Link>
            <Link
              to={`/my/carts/${user?._id}`}
              className='flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer'
            >
              <span className='text-lg'>장바구니</span>
              {/* <span className='text-lg font-semibold'>{makeArr(user.carts).length}</span> */}
            </Link>
            <Link
              to={`/my/messagesList/${user?._id}`}
              // state={{ messages: makeArr(user.messages) }}
              className='flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer'
            >
              <span className='text-lg'>내 쪽지함</span>
              {/* <span className='text-lg font-semibold'>{makeArr(user.messages).length}</span> */}
            </Link>
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
};
