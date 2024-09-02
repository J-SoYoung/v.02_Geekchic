import { useNavigate } from 'react-router-dom';
import { usedProduct } from '../usedHome/UsedProductsCart';
import Chevron_left from '@assets/icons/chevron_left.svg';

export const UsedProductsDetail = () => {
  const navigate = useNavigate();

  return (
    <main className='text-left'>
      {/* image view*/}
      <section>
        <div className='w-full h-[100%]'>
          <div className='mb-6 bg-gray-200 border-red-400'>
            <img src={usedProduct.imageArr[0]} alt={usedProduct.itemName} className='w-[100%] h-96 object-cover' />
          </div>
          <div className='flex space-x-4 pl-8'>
            {usedProduct.imageArr.map((i: string, idx: number) => (
              <div key={idx} className='w-24 h-24 flex items-center justify-center'>
                <img src={i} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>

        <button className='w-10 h-10 fixed top-2 cursor-pointer' onClick={() => navigate(-1)}>
          <img src={Chevron_left} alt='이전 페이지로' className='w-full' />
        </button>
      </section>

      <article className='p-8 pb-24'>
        {/* seller */}
        <section className='flex justify-between items-center border-b'>
          <div className='flex pb-6'>
            <div className='w-12 h-12 bg-gray-200 rounded-full'>
              <img src={usedProduct.seller.userAvatar ?? ''} alt='유저' />
            </div>
            <div className='ml-4'>
              <p className='text-lg font-semibold'>{usedProduct.seller.nickname}</p>
              <p className='text-sm text-gray-500'>{usedProduct.seller.address}</p>
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
          <div className='text-xl font-bold'>{usedProduct.itemName}</div>
          <div className='text-sm text-gray-500'>{usedProduct.createdAt}</div>
          {/* <div className='text-sm text-gray-500'>{calculateDaysAgo(usedProduct.createdAt)}</div> */}
          <div className='text-xl font-bold mt-2'>{usedProduct.price.toLocaleString()}원</div>
          <div className='flex space-x-2 mt-2'>
            {usedProduct.options.map((i: string, idx: number) => (
              <span key={idx} className='px-2 py-1 bg-gray-200 rounded-full text-sm'>
                {i}
              </span>
            ))}
          </div>
          <div className='py-8'>{usedProduct.description}</div>
        </section>

        {/* comment */}
        <section>댓글은 기다려. 왕창 고친다</section>
      </article>
    </main>
  );
};
