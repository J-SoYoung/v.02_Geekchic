import { addCartItems } from '@/_apis';
import { UserDataType } from '@/_typesBundle';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItems {
  productId: string;
  userId: string;
  size: string;
  selectedQuantity: number;
  createdAt: string[];
}
interface useAddToCartMutationProps {
  cartItems: CartItems;
  setUser: React.Dispatch<React.SetStateAction<UserDataType>>;
  user: UserDataType;
  navigate: (path: string) => void;
}

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartItems,
      setUser,
      user,
    }: useAddToCartMutationProps) => {
      return await addCartItems({ cartItems, setUser, user });
    },
    onSuccess: (data, { navigate, user }) => {
      if (data) {
        if (confirm('장바구니 페이지로 이동하시겠습니까?')) {
          navigate(`/my/carts/${user._id}`);
        }
      } else {
        alert('장바구니 추가에 실패했습니다. 다시 시도해 주세요.');
      }
    },
    onError: (error: any) => {
      console.error('장바구니 추가 중 에러 발생:', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['cartItems'],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });
};
