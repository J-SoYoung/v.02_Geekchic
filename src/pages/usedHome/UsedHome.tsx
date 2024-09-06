import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { SearchBar } from './SearchBar';
import { SearchList } from './SearchList';
import { Skeleton } from './Skeleton';
import { ProductsList } from './productsList';
import { MoveButton } from '@/components/button/MoveButton';

import { userState } from '@/_recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { loadUsedProducts } from '@/_apis/apis';
import { UsedProductType } from '@/_typesBundle/productType';
import { usedProduct } from '../../_example/example';

// ⭕ { } 컴포넌트 나누기
// ⭕ 로티이미지 추가 : 데이터 새로고침 해주세요
export const UsedHome = () => {
  const isSoldout = usedProduct.quantity < 1; // TEST
  const user = useRecoilValue(userState);
  const [searchResult, setSearchResult] = useState<UsedProductType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: usedProducts,
    isLoading,
    isError,
  } = useQuery<UsedProductType[], Error>({
    queryKey: ['usedProducts'],
    queryFn: () => loadUsedProducts(),
    retry: 3, // 쿼리옵션-> 요청 3번 재시도
    retryDelay: 1000, // 쿼리옵션-> 재시도 사이의 지연 시간
  });

  const onClickBackToUsedHome = () => {
    setIsSearching(false);
  };

  if (isError) {
    return (
      <div className='border h-40 p-2 text-center'>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <button
          className='cursor-pointer hover:font-bold'
          onClick={() => window.location.reload()}
        >
          GeekChic 중고 메인 페이지 새로고침
        </button>
      </div>
    );
  }

  return (
    <main className='p-11 pb-4 text-right'>
      <header>
        <h1 className='text-3xl font-bold text-left mb-5 '>
          <Link to='/used'>중고거래</Link>
        </h1>
        <span>{user?.username}님 반갑습니다!</span>
        <MoveButton text={'제품 등록'} url={'/used/new'} />
      </header>

      <SearchBar
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
      />

      {isLoading ? (
        <Skeleton />
      ) : isSearching ? (
        <SearchList
          searchResult={searchResult}
          onClickFunc={onClickBackToUsedHome}
        />
      ) : (
        usedProducts && <ProductsList usedProducts={usedProducts} />
      )}
    </main>
  );
};
