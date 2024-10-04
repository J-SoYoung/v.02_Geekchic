import { SearchResult } from '@/_apis';
import { UsedProductCard } from '@/components/UsedProductCard';

interface SearchListProps {
  searchResult: SearchResult[];
  onClickFunc: () => void;
  url: string;
}

// ⭕ 로티이미지 추가 : 검색 결과 없음
export const SearchList = ({
  searchResult,
  onClickFunc,
  url,
}: SearchListProps) => {
  console.log(searchResult);

  return (
    <section>
      <p className='mb-1 text-left font-bold '>
        전체<span>{searchResult.length}</span>
      </p>
      {searchResult.length !== 0 ? (
        <div className='grid grid-cols-2 gap-4 mt-4 mb-24'>
          {searchResult.map((search: SearchResult) => {
            console.log(url)
            return (
              <UsedProductCard
                url={url}
                key={search.id}
                id={search.id}
                name={search.productName}
                price={search.price}
                image={search.images[0]}
                quantity={search.quantity}
                isSoldOut={search.quantity < 1}
              />
            );
          })}
        </div>
      ) : (
        <div className='border h-40 text-center'>검색결과가 없습니다</div>
      )}
      <button
        onClick={onClickFunc}
        className='w-full p-2 rounded-lg bg-white hover:font-bold'
      >
        메인으로 돌아가기
      </button>
    </section>
  );
};
