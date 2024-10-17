import {
  getCategoriesSortData,
  getUsedPageMainInfo,
  getWishDataState,
} from '@/_apis';
import { ProductType } from '@/_typesBundle';
import { useQuery } from '@tanstack/react-query';

const useProducts = (activeTab: string) => {
  return useQuery<ProductType[]>({
    queryKey: ['products', activeTab],
    queryFn: async () =>
      await getCategoriesSortData({
        url: 'products',
        categories: activeTab,
      }),
    enabled: !!activeTab,
  });
};

const useProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () =>
      await getUsedPageMainInfo<ProductType>({
        table: 'products',
        id: productId as string,
      }),
  });
};

interface useWishStateProps {
  userId: string;
  productId: string;
}

const useWishState = ({ userId, productId }: useWishStateProps) => {
  return useQuery({
    queryKey: ['wishListState', userId],
    queryFn: async () =>
      await getWishDataState({
        userId: userId,
        productId: productId as string,
      }),
  });
};

export { useProducts, useProductDetail, useWishState };