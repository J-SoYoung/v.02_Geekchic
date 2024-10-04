import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from './index';

import {
  BasicButton,
  ErrorPageReload,
  SearchBar,
  SearchList,
  UsedProductCard,
} from '@/components';
import { userState } from '@/_recoil';
import { getUsedPageSortData, SearchResult } from '@/_apis';
import { UsedProductType } from '@/_typesBundle';
import { validateUserData } from '@/_utils';

export const UsedHome = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: usedProducts,
    isLoading,
    isError,
  } = useQuery<UsedProductType[]>({
    queryKey: ['usedProducts'],
    queryFn: async () =>
      await getUsedPageSortData<UsedProductType>({ url: 'usedProducts' }),
    retry: 3, // 쿼리옵션-> 요청 3번 재시도
    retryDelay: 1000, // 쿼리옵션-> 재시도 사이의 지연 시간
  });

  const onClickMoveUploadPage = () => {
    if (user._id === '') {
      alert('로그인 한 유저만 업로드가 가능합니다. 로그인 페이지로 이동합니다');
      return navigate(`/login`);
    }
    if (!validateUserData(user)) {
      alert('유저 정보를 업데이트 해주세요.');
      return navigate(`/my/profile/${user._id}`);
    } else {
      navigate('/used/new');
    }
  };

  if (isError) {
    return (
      <ErrorPageReload
        content='데이터를 가져오는 동안 문제가 발생했습니다'
        pageName={'중고 메인'}
      />
    );
  }

  return (
    <main className='p-11 pb-8 text-right'>
      <header>
        <h1 className='text-3xl font-bold text-left mb-5 '>
          <Link to='/used'>중고거래</Link>
        </h1>
        <div className='mb-4 flex justify-end items-center'>
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
        url='usedProducts'
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
      />

      {isLoading ? (
        <Skeleton />
      ) : isSearching ? (
        <SearchList
          url='used'
          searchResult={searchResult}
          onClickFunc={() => setIsSearching(false)}
        />
      ) : (
        usedProducts && (
          <div className='grid grid-cols-2 gap-4 mt-4 mb-24'>
            {usedProducts?.map((usedProduct) => (
              <UsedProductCard
                url='used'
                key={usedProduct.id}
                id={usedProduct.id}
                name={usedProduct.productName}
                price={usedProduct.price}
                image={usedProduct.images[0]}
                quantity={usedProduct.quantity}
                isSoldOut={usedProduct.quantity < 1}
                sellerId={usedProduct.seller._id}
              />
            ))}
          </div>
        )
      )}
    </main>
  );
};
