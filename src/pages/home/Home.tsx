import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CategoriesButton, ProductCard } from './index';
import { BasicButton, SearchBar, SearchList } from '@/components';
import { useProducts } from '@/hooks';
import { userState } from '@/_recoil';
import { CategoriesType, ProductType } from '@/_typesBundle';
import { headerLogo, mainImg } from '@/_assets';
import { SearchResult } from '@/_apis';

export const Home = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'outer' | 'top' | 'bottom' | 'shoes' | 'acc' | 'all'
  >('all');

  const categories: CategoriesType[] = useMemo(() => 
    [
      { title: '전체', value: 'all' },
      { title: '아우터', value: 'outer' },
      { title: '상의', value: 'top' },
      { title: '하의', value: 'bottom' },
      { title: '신발', value: 'shoes' },
      { title: '악세사리', value: 'acc' },
    ], []);

  const onClickMoveProductUpload = useCallback(() => {
    navigate('/products/new');
  }, [navigate]);

  const { data: products, isPending } = useProducts(activeTab);

  return (
    <div className='relative'>
      <header className='pt-20 px-8 pb-8 flex flex-col items-center border'>
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
        <img src={headerLogo} width={'300px'} className='mb-4' />
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
              {categories.map((category) => (
                <CategoriesButton
                  key={category.value}
                  title={category.title}
                  value={category.value}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </section>

            <section>
              {isPending ? (
                <p>로딩중</p>
              ) : products && products.length === 0 ? (
                <p>데이터가 없습니다</p>
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
