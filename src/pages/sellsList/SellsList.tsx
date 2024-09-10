import { getMyPageInfo } from '@/_apis/apis';
import { SellsItemType } from '@/_typesBundle';
import { Layout } from '@/components/Layout';
import { UsedProductCard } from '@/components/UsedProductCard';


import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export const SellsList = () => {
  const { userId } = useParams<string>();

  const {
    data: sellsItem,
    isPending,
    isError,
  } = useQuery<SellsItemType[]>({
    queryKey: ['sellsItem'],
    queryFn: async () => await getMyPageInfo(userId as string),
  });

  // ⭕ 로티이미지 추가 : 에러 페이지 데이터 새로고침 해주세요
  if (isError) {
    return (
      <div className='border h-40 p-2 text-center'>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <button
          className='cursor-pointer hover:font-bold'
          onClick={() => window.location.reload()}
        >
          GeekChic MY 판매목록 페이지 새로고침
        </button>
      </div>
    );
  }

  return (
    <Layout title='판매목록'>
      {isPending ? (
        <p>로딩중</p>
      ) : (
        <div className='text-left'>
          <div className=' text-m text-gray-600 m-8 mb-4 pb-4 border-b'>
            <span className='font-bold'>전체 {sellsItem?.length}</span>
          </div>
          <div className='p-8 pt-4 grid grid-cols-2 gap-4 mb-24'>
            {sellsItem?.length === 0 ? (
              <div>
                판매중인 상품이 없습니다.
                <p>
                  <Link to='/usedHome'>중고 홈 구경하기</Link>
                </p>
              </div>
            ) : (
              sellsItem?.map((item) => {
                return (
                  <UsedProductCard
                    key={item.usedProductId}
                    id={item.usedProductId}
                    name={item.productName}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    isSoldOut={item.quantity < 1}
                    showSellerInfo={true}
                    sellsQuantity={item.sellsQuantity}
                  />
                );
              })
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
