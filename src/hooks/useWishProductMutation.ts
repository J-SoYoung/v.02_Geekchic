import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addWishList, removeWishData } from '@/_apis';

export const useWishProductMutation = (userId: string, productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isWished: boolean) => {
      if (!isWished) {
        await addWishList({ userId, productId });
        alert('관심물품 추가합니다');
      } else {
        await removeWishData({ userId, productId });
        alert('관심물품 삭제합니다');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['wishListState', userId],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });
};
