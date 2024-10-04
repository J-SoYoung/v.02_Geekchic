import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { searchProducts, SearchResult } from '@/_apis';

interface SearchBarProps {
  url: string;
  setSearchResult: React.Dispatch<
    React.SetStateAction<SearchResult[]>
  >;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({
  url,
  setSearchResult,
  setIsSearching,
}: SearchBarProps) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  // ⭕mutation으로 검색기능 구현
  const onClickButtonSearch = async () => {
    const result = await searchProducts({ searchQuery, url });
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
