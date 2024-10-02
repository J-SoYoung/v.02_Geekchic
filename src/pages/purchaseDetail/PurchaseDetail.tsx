import { getUsedPageSortData } from '@/_apis';
import { userState } from '@/_recoil';
import { PaymentsDataInfoType, PaymentsProductItemsType } from '@/_typesBundle';
import { Layout } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const PurchaseDetail = () => {
  const user = useRecoilValue(userState);

  const {
    data: purchasesDatas,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['purchaselist', user._id],
    queryFn: async () =>
      await getUsedPageSortData<PaymentsDataInfoType>({
        url: `purchaseList/${user._id}`,
      }),
  });

  return (
    <>
      {purchasesDatas?.map((purchasesData) => {
        const { buyerInfo, paymentsData } = purchasesData;
        return (
          <Layout title='주문 상세내역'>
            <div className='text-left mb-28'>
              <p className='text-lg'>{purchasesData.createdAt[0]}</p>
              <div className='py-4'>
                {paymentsData.paymentsProductItems.map(
                  (item: PaymentsProductItemsType, idx: number) => (
                    <div key={idx} className='flex items-center mb-4 '>
                      <img
                        src={item.image}
                        alt={item.productName}
                        className='w-24 h-24 object-cover rounded-md'
                      />
                      <div className='ml-4'>
                        <p className='text-lg font-semibold'>
                          {item.productName}
                        </p>
                        <p className='text-sm text-gray-500'>
                          {item.size} / {item.quantity}개
                        </p>
                        <p className='font-bold'>
                          {Number(item.price).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ),
                )}
                <p className='py-4 text-center bg-gray-200'>
                  구매 금액 :{Number(paymentsData.totalAmount).toLocaleString()}
                  원
                </p>
              </div>

              {/* 구매 정보 */}
              <div className='py-8'>
                <h2 className='mb-4 text-lg font-semibold'>구매 정보</h2>
                <div className='pl-2'>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    결제방법
                  </label>
                  <p className='p-2 mb-8 block text-lg border-b '>
                    {purchasesData.paymentMethod}
                  </p>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    구매자명
                  </label>
                  <p className='p-2 mb-8 block text-lg border-b '>
                    {buyerInfo.buyerName}
                  </p>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    배송지
                  </label>
                  <p className='p-2 mb-8 block text-lg border-b '>
                    {buyerInfo.address}
                  </p>

                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    전화번호
                  </label>
                  <p className='p-2 mb-8 block text-lg border-b '>
                    {buyerInfo.phone}
                  </p>
                </div>
              </div>
            </div>
          </Layout>
        );
      })}
    </>
  );
};
