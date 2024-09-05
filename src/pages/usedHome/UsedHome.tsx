import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { userState } from '@/_recoil/atoms';
import { useRecoilValue } from 'recoil';
import { usedProduct } from '../../_example/example';
import { Fragment, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadUsedProducts } from '@/_apis/apis';
import { UsedProductsType } from '@/_typesBundle/productType';
import { UsedProductsCart } from './UsedProductsCart';
import Skeleton from './Skeleton';

// ⭕ { } 컴포넌트 나누기
export const UsedHome = () => {
  const isSoldout = usedProduct.quantity < 1; // TEST
  const user = useRecoilValue(userState);

  const {
    data: usedProducts,
    isLoading,
    isError,
    error,
  } = useQuery<UsedProductsType[], Error>({
    queryKey: ['usedProducts'],
    queryFn: () => loadUsedProducts(),
    retry: 3, // 쿼리옵션-> 요청 3번 재시도
    retryDelay: 1000, // 쿼리옵션-> 재시도 사이의 지연 시간
  });

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
      <section className='w-full h-[50px] px-4 mb-8 flex items-center justify-between text-xl bg-[#EEE] rounded-lg'>
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
      {isLoading ? (
        <Skeleton/>
      ) : (
        <>
          {usedProducts?.map((usedProduct) => {
            return (
              <Fragment key={usedProduct.id}>
                <UsedProductsCart usedProduct={usedProduct} />
              </Fragment>
            );
          })}
        </>
      )}
    </main>
  );
};
