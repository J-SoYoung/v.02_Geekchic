import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CategoriesButton, ProductCard } from './index';
import { BasicButton, SearchBar,SearchList } from '@/components';
import { userState } from '@/_recoil';
import { ProductType } from '@/_typesBundle';
import { headerLogo, mainImg } from '@/_assets';
import { getUsedPageSortData, SearchResult } from '@/_apis';

export const Home = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'outer' | 'top' | 'bottom' | 'shoes' | 'acc' | 'all'
  >('all');

  const { data: products, isPending } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: async () =>
      await getUsedPageSortData<ProductType>({ url: 'products' }),
  });

  const onClickMoveProductUpload = () => {
    navigate('/products/new');
  };

  return (
    <div className='relative'>
      {user.isAdmin && (
        <div className='absolute top-8 right-8'>
          <BasicButton
            onClickFunc={onClickMoveProductUpload}
            text='제품등록'
            bg='bg-black'
            width='w-[100px]'
          />
        </div>
      )}
      <header className='pt-20 px-8 pb-8 flex flex-col items-center border'>
        <img src={headerLogo} width={'300px'} className='mb-4' />

        {/* 검색바 */}
        <SearchBar
          url='products'
          setSearchResult={setSearchResult}
          setIsSearching={setIsSearching}
        />
      </header>

      {isSearching ? (
        <main className='p-8'>
          <SearchList
            url='products'
            searchResult={searchResult}
            onClickFunc={() => setIsSearching(false)}
          />
        </main>
      ) : (
        <main>
          <article className='w-full h-80'>
            <img className='object-cover w-full h-full' src={mainImg} />
          </article>
          <article className='p-8'>
            <section className='flex justify-between border-b mb-8'>
              <CategoriesButton
                title='전체'
                value='all'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <CategoriesButton
                title='아우터'
                value='outer'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <CategoriesButton
                title='상의'
                value='top'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <CategoriesButton
                title='하의'
                value='bottom'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <CategoriesButton
                title='가방'
                value='shoes'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <CategoriesButton
                title='악세사리'
                value='acc'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </section>
            <section className=''>
              {isPending ? (
                <p>로딩중</p>
              ) : (
                <div className='grid grid-cols-4 gap-4 mt-4 mb-24'>
                  {products &&
                    products.map((product: ProductType) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.images[0]}
                        productName={product.productName}
                      />
                    ))}
                </div>
              )}
            </section>
          </article>
        </main>
      )}
    </div>
  );
};
