import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { userState } from '@/_recoil/atoms';
import { useRecoilValue } from 'recoil';
import { usedProduct } from '../../_example/example';

export const UsedHome = () => {
  const isSoldout = usedProduct.quantity < 1; // TEST
  const user = useRecoilValue(userState);
  return (
    <main className='p-11 pb-4 text-right'>
      {/* 헤더 */}
      <header>
        <h1 className='text-3xl font-bold text-left mb-5 '>
          <Link to='/used'>중고거래</Link>
        </h1>
        <span>{user?.username}님 반갑습니다!</span>
        <button className='w-[100px] h-[50px] mb-5 ml-2 bg-black text-center text-white rounded-md '>
          <Link to='/used/new'>제품 등록</Link>
        </button>
      </header>

      {/* 검색바 */}
      <section className='w-full h-[50px] px-4 flex items-center justify-between  text-xl bg-[#EEE] rounded-lg'>
        <input
          className='w-full outline-none placeholder-gray-500 bg-[#EEE]'
          type='text'
          placeholder='상품검색'
          maxLength={50}
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='bg-[#EEE] h-full'>
          <BsSearch />
        </button>
      </section>

      {/* 상품목록 */}
      <section className='grid grid-cols-2 gap-4 mt-4 mb-24'>
        <Link
          to={`/used/detail/example1`}
          className={`rounded-lg cursor-pointer relative ${isSoldout && 'opacity-50'}`}
        >
          {/* <IsSeller sellerId={usedProduct?.seller.sellerId} /> */}
          {usedProduct.images ? (
            <img
              className='w-full h-48 object-cover rounded-md mb-2'
              src={usedProduct.images[0]}
              alt={usedProduct.productName}
            />
          ) : (
            <img
              src='/'
              className='w-full h-48 object-cover rounded-md mb-2 border'
            />
          )}
          <div className='flex'>
            <h2 className='text-lg font-bold mr-1 '>{usedProduct.productName}</h2>
          </div>
          <div className='flex items-center justify-center'>
            <div className='w-full flex text-gray-500'>
              <p>{usedProduct.price.toLocaleString()}원</p>
              <p>
                {isSoldout ? '( 품절 )' : `( ${usedProduct.quantity}개 남음 )`}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
};
