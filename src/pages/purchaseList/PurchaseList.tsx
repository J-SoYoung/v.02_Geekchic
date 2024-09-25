import { getMyPageData } from '@/_apis';
import { defaultImage } from '@/_example';
import { UsedPurchaseListType } from '@/_typesBundle';
import { Layout, MyProductCard } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const purchasesData = [
  {
    createdAt: ['2024-09-25', '11:50:10'],
    price: 120000,
    productId: '나이키 V2K 런',
    productImage: defaultImage,
    productName: '나이키 V2K 런',
    productsQuantity: 1,
    purchaseId: 'purchase1',
    sellerId: 'thdud1',
    sellerName: '소영',
    title: 'shoese',
    size: '250',
  },
  {
    createdAt: ['2024-09-26', '11:50:10'],
    price: 120000,
    productId: '나이키 V2K 런',
    productImage: defaultImage,
    productName: '나이키 V2K 런',
    productsQuantity: 1,
    purchaseId: 'purchase2',
    sellerId: 'thdud1',
    sellerName: '소영',
    title: 'shoese',
    size: '250',
  },
];
export const PurchaseList = () => {
  const { userId } = useParams<string>();
  const [activeTab, setActiveTab] = useState<
    'all' | 'products' | 'usedProducts'
  >('all');
  const [filteredData, setFilteredData] = useState<UsedPurchaseListType[]>([]);

  const {
    data: usedPurchasesData,
    isPending: usedPurchasesPending,
    isError: usedPurchasesError,
  } = useQuery({
    queryKey: ['usedPurchase', userId],
    queryFn: async () =>
      await getMyPageData<UsedPurchaseListType>({
        userId: userId as string,
        table: 'usedPurchaseList',
      }),
  });
  // 제품 구매목록 가지고 와야함 useQuery로

  useEffect(() => {
    if (usedPurchasesData && purchasesData) {
      if (activeTab === 'all') {
        const combineData = [...usedPurchasesData, ...purchasesData].sort(
          (a, b) =>
            new Date(b.createdAt.join('')).getTime() -
            new Date(a.createdAt.join('')).getTime(),
        );
        setFilteredData(combineData);
      } else if (activeTab === 'products') {
        setFilteredData(purchasesData);
      } else if (activeTab === 'usedProducts') {
        setFilteredData(usedPurchasesData);
      }
    }
  }, [purchasesData, usedPurchasesData, activeTab]);

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
          {filteredData.map((data) => (
            <MyProductCard
              key={data.purchaseId}
              createdAt={data.createdAt}
              productImage={data.productImage}
              productName={data.productName}
              size={data.size}
              quantity={data.productsQuantity}
              price={data.price}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};
