import { Link } from 'react-router-dom';
import { usedProduct, UsedProductsCart } from './UsedProductsCart';
import { BsSearch } from 'react-icons/bs';

export const UsedHome = () => {
  const isSoldout = usedProduct.quantity < 1; // TEST

  return (
    <main className='p-11 pb-4 text-right'>
      {/* 헤더 */}
      <header>
        <h1 className='text-3xl font-bold text-left mb-5 '>
          <Link to='/used'>중고거래</Link>
        </h1>
        <button className='w-[100px] h-[50px] mb-5 bg-black text-center text-white rounded-md '>
          <Link to='/used/new'>등록하기</Link>
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
          {usedProduct.imageArr ? (
            <img
              className='w-full h-48 object-cover rounded-md mb-2'
              src={usedProduct.imageArr[0]}
              alt={usedProduct.itemName}
            />
          ) : (
            <img src='/' className='w-full h-48 object-cover rounded-md mb-2 border' />
          )}
          <div className='flex'>
            <h2 className='text-lg font-bold mr-1 '>{usedProduct.itemName}</h2>
          </div>
          <div className='flex items-center justify-center'>
            <div className='w-full flex text-gray-500'>
              <p>{usedProduct.price.toLocaleString()}원</p>
              <p>{isSoldout ? '( 품절 )' : `( ${usedProduct.quantity}개 남음 )`}</p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
};
