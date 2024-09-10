import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { SearchBar, SearchList, Skeleton } from './index';

import { BasicButton, UsedProductCard } from '@/components';
import { userState } from '@/_recoil';
import { getUsedProducts } from '@/_apis';
import { UsedProductType } from '@/_typesBundle';
import { validateUserData } from '@/_utils';

export const UsedHome = () => {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const [searchResult, setSearchResult] = useState<UsedProductType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: usedProducts,
    isLoading,
    isError,
  } = useQuery<UsedProductType[], Error>({
    queryKey: ['usedProducts'],
    queryFn: async () => await getUsedProducts(),
    retry: 3, // 쿼리옵션-> 요청 3번 재시도
    retryDelay: 1000, // 쿼리옵션-> 재시도 사이의 지연 시간
  });

  const onClickBackToUsedHome = () => {
    setIsSearching(false);
  };

  const onClickMoveUploadPage = () => {
    if (!validateUserData(user)) {
      alert('유저 정보를 업데이트 해주세요.');
      return navigate(`/my/profile/${user._id}`);
    } else {
      navigate('/used/new');
    }
  };

  // ⭕ 로티이미지 추가 : 에러 페이지 데이터 새로고침 해주세요
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
        <div className='flex justify-end items-center'>
          <span className='mr-2'>{user?.username}님 반갑습니다!</span>
          <BasicButton
            onClickFunc={onClickMoveUploadPage}
            text='제품등록'
            bg='bg-black'
            width='w-[100px]'
          />
        </div>
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
        usedProducts && (
          <div className='grid grid-cols-2 gap-4 mt-4 mb-24'>
            {usedProducts?.map((usedProduct) => (
              <UsedProductCard
                key={usedProduct.id}
                id={usedProduct.id}
                name={usedProduct.productName}
                price={usedProduct.price}
                image={usedProduct.images[0]}
                quantity={usedProduct.quantity}
                isSoldOut={usedProduct.quantity < 1}
              />
            ))}
          </div>
        )
      )}
    </main>
  );
};
