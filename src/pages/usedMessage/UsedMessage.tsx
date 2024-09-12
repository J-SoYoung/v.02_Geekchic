import { useLocation } from 'react-router-dom';
import { Layout } from '@/components';

export const UsedMessage = () => {
  const location = useLocation();
  const {
    buyerId,
    createdAt,
    messageId,
    price,
    productId,
    productImage,
    productName,
    quantity,
    sellerId,
    sellerName,
  } = location.state || {};

  console.log(messageId);
  return (
    <Layout title={'쪽지 보내기'}>
      <div className='p-8 min-h-screen flex flex-col bg-gray-100'>
        {/* 판매자정보 */}
        <div className='border p-4 mb-8 flex bg-white'>
          <img
            src={productImage}
            alt='Product'
            className='w-20 h-20 mr-4 rounded-md object-cover'
          />
          <div className='text-left'>
            <div className='text-lg font-bold'>판매자 : {sellerName}</div>
            <div className='text-gray-500'>{productName}</div>
            <div className='text-lg font-semibold text-[#8F5BBD]'>
              {price.toLocaleString()}원
            </div>
          </div>
        </div>

        <div className='p-3 mb-4 bg-gray-200 text-black rounded-lg'>
          "{productName}" 판매자 <br /> {sellerName}입니다
        </div>
      </div>
    </Layout>
  );
};
