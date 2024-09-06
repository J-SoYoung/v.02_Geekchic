import { searchUsedProducts } from '@/_apis/apis';
import { UsedProductType } from '@/_typesBundle/productType';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
  setSearchResult: React.Dispatch<React.SetStateAction<UsedProductType[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({
  setSearchResult,
  setIsSearching,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onClickButtonSearch = async () => {
    const result = await searchUsedProducts(searchQuery);
    setSearchResult(result);
    setIsSearching(true);
  };

  return (
    <section className='w-full h-[50px] px-4 mb-8 flex items-center justify-between text-xl bg-[#EEE] rounded-lg'>
      <input
        className='w-full outline-none placeholder-gray-500 bg-[#EEE]'
        type='text'
        placeholder='상품검색'
        maxLength={50}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onClickButtonSearch();
        }}
      />
      <button onClick={onClickButtonSearch} className='bg-[#EEE] h-full'>
        <BsSearch />
      </button>
    </section>
  );
};
