import { getWishList, removeWishData } from '@/_apis';
import { userState } from '@/_recoil';
import { Layout } from '@/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const WishList = () => {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const {
    data: wishLists,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['wishLists', user._id],
    queryFn: async () => await getWishList({ userId: user._id }),
  });

  const removeWishListMutation = useMutation({
    mutationFn: async (productId: string) =>
      await removeWishData({
        productId: productId as string,
        userId: user._id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishLists', user._id],
        refetchType: 'active',
        exact: true,
      });
    },
  });

  const onClickRemoveWishList = ({ productId }: { productId: string }) => {
    if (confirm('정말로 관심물품을 삭제하시겠습니까?'))
      removeWishListMutation.mutate(productId);
  };

  return (
    <Layout title='관심물품'>
      <div className='text-left'>
        <div className=' text-m text-gray-600 mb-4 pb-4 border-b'>
          <span className='font-bold'>전체 {wishLists?.length}</span>
        </div>

        {isPending && wishLists === undefined ? (
          <p>로딩중</p>
        ) : (
          <>
            {wishLists?.map((wishList, idx) => {
              console.log(wishList);
              return (
                <div
                  key={idx}
                  className='p-4 flex justify-between rounded-md border-b hover:bg-gray-100'
                >
                  <Link to={`/products/detail/${wishList.id}`} className='flex'>
                    <img
                      src={wishList.images[0]}
                      alt={wishList.productName}
                      className='w-24 h-24 mr-4 object-cover rounded-md'
                    />
                    <div className='text-left pt-2 '>
                      <h2 className='mb-2 text-m font-bold'>
                        {wishList.productName}
                      </h2>
                      <p className='text-base'>
                        {wishList.price.toLocaleString()}원
                      </p>
                      <p className='text-base'>
                        {wishList.quantity}개 남았습니다
                      </p>
                    </div>
                  </Link>
                  <button
                    className='p-2'
                    onClick={() =>
                      onClickRemoveWishList({ productId: wishList.id })
                    }
                  >
                    {' '}
                    X{' '}
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
};
