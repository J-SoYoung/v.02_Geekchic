import { userState } from '@/_recoil';
import { Layout } from '@/components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { utcToKoreaTimes } from '@/_utils';
import { paymentProducts } from '@/_apis';
import { PaymentsProductItemsType } from '@/_typesBundle';

export const Payments = () => {
  const location = useLocation();
  const { paymentsData } = location.state;
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [paymentMethod, setPaymentMethod] = useState('');

  const onClickMoveToMain = () => {
    if (confirm('주문 데이터가 초기화됩니다. 메인으로 이동하시겠습니까?')) {
      return navigate(`/my/carts/${user._id}`);
    }
  };
  const onClickPayments = async () => {
    if (paymentMethod === '') {
      return alert('결제수단을 선택해주세요');
    }
    const paymentInfo = {
      paymentsData,
      paymentMethod,
      buyerInfo: {
        buyerName: user.username,
        address: user.address,
        phone: user.phone,
      },
      createdAt: utcToKoreaTimes(),
    };
    const result = await paymentProducts(paymentInfo, user, setUser);
    if (result) {
      alert('결제가 성공적으로 되었습니다. 마이페이지로 이동하겠습니다');
      navigate(`/my/${user._id}`);
    }
  };

  return (
    <Layout title='결제하기' onClickFunc={onClickMoveToMain}>
      <div className='text-left mb-28'>
        <p className='text-lg mb-4'>{utcToKoreaTimes()[0]}</p>
        <div className='mb-8'>
          {paymentsData.paymentsProductItems.map(
            (item: PaymentsProductItemsType, idx: number) => (
              <div key={idx} className='flex items-center mb-4'>
                <img
                  src={item.image}
                  alt={item.productName}
                  className='w-24 h-24 object-cover rounded-md'
                />
                <div className='ml-4'>
                  <p className='text-lg font-semibold'>{item.productName}</p>
                  <p className='text-sm text-gray-500'>
                    {item.size} / {item.quantity}개
                  </p>
                  <p className='font-bold'>{item.price.toLocaleString()}원</p>
                </div>
              </div>
            ),
          )}
          {/* 총금액 */}
          <div className='py-4 text-center bg-gray-200'>
            <span className='inline-block mr-4 text-gray-600'>상품 합계</span>
            <span className='font-bold'>
              {paymentsData.totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제방법 */}
        <div className='border-gray-300 py-8'>
          <h2 className='mb-4 text-lg font-bold '>결제방법</h2>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='w-full border rounded-lg p-4'
          >
            <option value=''>결제 선택</option>
            <option value='creditCard'>신용카드</option>
            <option value='cash'>무통장 입금</option>
            <option value='pay'>페이결제</option>
          </select>
        </div>

        {/* 배송지 정보 */}
        <div className='py-8'>
          <h2 className='mb-4 text-lg font-semibold'>구매자 정보</h2>
          <div className='pl-2'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              구매자명
            </label>
            <p className='p-2 mb-8 block text-lg border-b '>{user.address}</p>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              배송지
            </label>
            <p className='p-2 mb-8 block text-lg border-b '>{user.username}</p>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              전화번호
            </label>
            <p className='p-2 mb-8 block text-lg border-b '>{user.phone}</p>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          onClick={onClickPayments}
          className='w-full bg-[#8F5BBD] text-white py-3 rounded-lg mt-4 font-bold'
        >
          결제하기
        </button>
      </div>
    </Layout>
  );
};
