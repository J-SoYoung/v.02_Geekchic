import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ErrorPageReload, Layout, UsedProductCard } from '@/components';
import { getUsedPageSortData } from '@/_apis';
import { SellsItemType } from '@/_typesBundle';

export const SellsList = () => {
  const { userId } = useParams<string>();

  const {
    data: sellsItem,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['sellsItem', userId],
    queryFn: async () =>
      await getUsedPageSortData<SellsItemType>({
        url: `userSellList/${userId}`,
      }),
  });

  if (isError) {
    return (
      <ErrorPageReload
        content='데이터를 가져오는 동안 문제가 발생했습니다'
        pageName={'판매목록'}
      />
    );
  }

  return (
    <Layout title='판매목록'>
      {isPending ? (
        <p>로딩중</p>
      ) : (
        <div className='text-left'>
          <div className=' text-m text-gray-600 mb-4 pb-4 border-b'>
            <span className='font-bold'>전체 {sellsItem?.length}</span>
          </div>
          <div className='pt-4 grid grid-cols-2 gap-4 mb-24'>
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
                    buyerInfo={item.buyerInfo}
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
