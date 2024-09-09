import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Skeleton from './Skeleton';

import Chevron_left from '@assets/icons/chevron_left.svg';
import { getUsedProductDetail } from '@/_apis/apis';
import { defaultImage } from '../../_example/example';

export const UsedProductsDetail = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();

  const {
    data: usedProduct,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['usedProductDetail', itemId],
    queryFn: () => getUsedProductDetail(itemId as string),
  });


  if (isPending) {
    return <Skeleton />;
  }

  if (isError)
    return (
      <div className='border h-80 py-20 text-center'>
        <div> 데이터가 없습니다. </div>
        <Link to='/used' className='hover:font-bold'>
          중고 메인페이지로 돌아가기
        </Link>
      </div>
    );

  return (
    <main className='text-left'>
      {/* image view*/}

      <section>
        <div className='w-full h-[100%]'>
          <div className='mb-6 bg-gray-200 border-red-400'>
            <img
              src={usedProduct.images[0]}
              alt={usedProduct.productName}
              className='w-[100%] h-96 object-cover'
            />
          </div>
          <div className='flex space-x-4 pl-8'>
            {usedProduct.images.map((i: string, idx: number) => (
              <div
                key={idx}
                className='w-24 h-24 flex items-center justify-center'
              >
                <img src={i} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>

        <button
          className='w-10 h-10 fixed top-2 cursor-pointer'
          onClick={() => navigate(-1)}
        >
          <img src={Chevron_left} alt='이전 페이지로' className='w-full' />
        </button>
      </section>

      <article className='p-8 pb-24'>
        {/* seller */}
        {/*⭕컴포넌트 만들기 : 유저정보 어디서 많이썼었는데.  */}
        <section className='flex justify-between items-center border-b'>
          <div className='flex pb-6'>
            <div className='w-12 h-12 bg-gray-200 rounded-full'>
              <img
                src={usedProduct.seller.avatar ?? defaultImage}
                alt='유저'
                className='w-full h-full object-cover rounded-full border'
              />
            </div>
            <div className='ml-4'>
              <p className='text-lg font-semibold'>
                {usedProduct.seller.username}
              </p>
              <p className='text-sm text-gray-500'>
                {usedProduct.seller.address}
              </p>
            </div>
          </div>
          {/* {userId !== data.seller.sellerId && (
            <button
              className='w-40 inline-block text-center py-3 mb-4 bg-[#8F5BBD] text-white rounded-md '
              onClick={onClickAddMessagePage}
            >
              {currentMessage ? '쪽지 이어하기' : '쪽지보내기'}
            </button>
          )} */}
        </section>

        {/* used products item */}
        <section className='my-8 border-b'>
          <div className='text-xl font-bold'>{usedProduct.productName}</div>
          <div className='text-sm text-gray-500'>
            {usedProduct.createdAt.split('T')[0]}
          </div>
          <div className='text-xl font-bold mt-2'>
            {usedProduct.price.toLocaleString()}원
          </div>
          <div className='flex space-x-2 mt-2'>
            <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
              {usedProduct.deliveryCharge ? '배송비 포함' : '배송비 비포함'}
            </span>
            <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
              {usedProduct.conditions === 'new' ? '새상품' : '중고상품'}
            </span>
          </div>
          <div className='py-8'>{usedProduct.description}</div>
        </section>

        {/* comment */}
        <section>댓글은 기다려. 왕창 고친다</section>
      </article>
    </main>
  );
};
