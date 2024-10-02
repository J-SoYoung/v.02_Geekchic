import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getUsedPageSortData } from '@/_apis';
import { PaymentsDataInfoType, UsedPurchaseListType } from '@/_typesBundle';
import { Layout, MyProductCard } from '@/components';

interface CombinedDataType {
  createdAt: string[];
  price: number;
  productId: string;
  productImage: string;
  productName: string;
  productsQuantity: number;
  size: string;
  paymentsId?: string;
  purchaseId?: string;
}

export const PurchaseList = () => {
  const { userId } = useParams<string>();
  const [activeTab, setActiveTab] = useState<
    'all' | 'products' | 'usedProducts'
  >('all');
  const [filteredData, setFilteredData] = useState<CombinedDataType[]>([]);

  const {
    data: usedPurchasesData,
    isPending: usedPurchasesPending,
    isError: usedPurchasesError,
  } = useQuery({
    queryKey: ['usedPurchase', userId],
    queryFn: async () =>
      await getUsedPageSortData<UsedPurchaseListType>({
        url: `usedPurchaseList/${userId}`,
      }),
  });

  const { data: purchasesDataInitial } = useQuery({
    queryKey: ['purchaselist', userId],
    queryFn: async () =>
      await getUsedPageSortData<PaymentsDataInfoType>({
        url: `purchaseList/${userId}`,
      }),
  });

  const transformedpurchasesData = purchasesDataInitial?.flatMap((purchase) => {
    return purchase.paymentsData.paymentsProductItems.map((item) => ({
      createdAt: purchase.createdAt,
      paymentsId: purchase.paymentsData.paymentsId,
      price: item.price,
      productId: item.productId,
      productImage: item.image,
      productName: item.productName,
      productsQuantity: item.quantity,
      size: item.size,
    }));
  });

  useEffect(() => {
    if (usedPurchasesData && transformedpurchasesData) {
      if (activeTab === 'all') {
        const combineData: CombinedDataType[] = [
          ...usedPurchasesData,
          ...transformedpurchasesData,
        ].sort(
          (a, b) =>
            new Date(b.createdAt.join('')).getTime() -
            new Date(a.createdAt.join('')).getTime(),
        );
        setFilteredData(combineData);
      } else if (activeTab === 'products') {
        setFilteredData(transformedpurchasesData);
      } else if (activeTab === 'usedProducts') {
        setFilteredData(usedPurchasesData);
      }
    }
  }, [purchasesDataInitial, usedPurchasesData, activeTab]);

  return (
    <Layout title='구매목록'>
      <div className='flex justify-start border-b mb-4'>
        <button
          onClick={() => setActiveTab('all')}
          className={`m-3 ${activeTab === 'all' ? 'text-[#8F5BBD] font-bold' : 'text-gray-500'}`}
        >
          전체
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`m-3 ${activeTab === 'products' ? 'text-[#8F5BBD] font-bold' : 'text-gray-500'}`}
        >
          제품
        </button>
        <button
          onClick={() => setActiveTab('usedProducts')}
          className={`m-3 ${activeTab === 'usedProducts' ? 'text-[#8F5BBD] font-bold' : 'text-gray-500'}`}
        >
          중고제품
        </button>
      </div>
      {usedPurchasesPending ? (
        <p>로딩중.</p>
      ) : (
        <div>
          {filteredData.map((data, idx) => (
            <MyProductCard
              key={idx}
              createdAt={data.createdAt}
              productImage={data.productImage}
              productName={data.productName}
              size={data.size}
              quantity={data.productsQuantity}
              price={data.price}
              paymentsId={data.paymentsId}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};
