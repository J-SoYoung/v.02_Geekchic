import { getCategoriesSortData } from '@/_apis';
import { ProductType } from '@/_typesBundle';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (activeTab: string) => {
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
