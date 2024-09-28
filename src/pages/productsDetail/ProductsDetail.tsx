import {
  addWishList,
  getUsedPageMainInfo,
  getWishDataState,
  removeWishData,
} from '@/_apis';
import { Icon_Chevron_left, Icon_FullHeart, Icon_Heart } from '@/_assets';
import { ProductType } from '@/_typesBundle';
import { BasicButton } from '@/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentInput, CommentsList } from '../usedProductsDetail';
import { userState } from '@/_recoil';
import { useRecoilValue } from 'recoil';

export const ProductsDetail = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const { productId } = useParams<{ productId: string }>();

  const [selectedSize, setSelectedSize] = useState('');

  const { data: currentWishState, isPending: currentWishPending } = useQuery({
    queryKey: ['wishList', user._id],
    queryFn: async () =>
      await getWishDataState({
        userId: user._id,
        productId: productId as string,
      }),
  });

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () =>
      getUsedPageMainInfo<ProductType>({
        table: 'products',
        id: productId as string,
      }),
  });

  const sizeOptions = product?.size.split(' / ');

  const wishProductMutation = useMutation({
    mutationFn: async () => {
      if (currentWishState === false) {
        await addWishList({
          userId: user._id,
          productId: productId as string,
        });
        alert('관심물품 추가합니다')
      } else {
        await removeWishData({
          userId: user._id,
          productId: productId as string,
        });
        alert('관심물품 삭제합니다')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey:  ['wishList', user._id],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });

  const onClickWishProduct = async () => {
    wishProductMutation.mutate();
  };

  const onClickPurchaseProduct = () => {};
  const onClickAddCart = () => {};

  if (isPending && currentWishPending) {
    return <p>로딩중</p>;
  }

  return (
    <main className='text-left'>
      <button
        className='w-10 h-10 fixed top-2 cursor-pointer'
        onClick={() => navigate(-1)}
      >
        <img src={Icon_Chevron_left} alt='이전 페이지로' className='w-full' />
      </button>
      {/* image view*/}
      <section className='w-full h-[100%]'>
        <div className='mb-6 bg-gray-200 border-red-400'>
          <img
            src={product?.images[0]}
            alt={product?.productName}
            className='w-[100%] h-96 object-cover'
          />
        </div>
        <div className='flex space-x-4 pl-8'>
          {product?.images.map((i: string, idx: number) => (
            <div
              key={idx}
              className='w-24 h-24 flex items-center justify-center'
            >
              <img src={i} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </section>

      {/* product info */}
      <section className='p-8 pb-0'>
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <p className='mb-1 text-lg'>{product?.productName}</p>
            <p className='text-2xl'>{product?.price}원</p>
          </div>
          <button onClick={onClickWishProduct}>
            <img
              src={currentWishState ? Icon_FullHeart : Icon_Heart}
              className='w-8 h-8'
            />
          </button>
        </div>
        <p>{product?.description}</p>
      </section>

      {/* purchases */}
      <section className='p-8'>
        <div className='mb-8'>
          <label
            htmlFor='sizeSelect'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            사이즈 선택
          </label>
          <select
            id='sizeSelect'
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
            }}
            className='block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 text-m rounded-lg '
          >
            <option value=''>사이즈를 선택하세요</option>
            {sizeOptions &&
              sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
          </select>
        </div>
        <div className='mb-8 flex'>
          <BasicButton
            onClickFunc={onClickAddCart}
            text={'장바구니'}
            bg={'bg-[#D34D4D]'}
          />
          <BasicButton
            onClickFunc={onClickPurchaseProduct}
            text={'바로구매'}
            bg={'bg-[#8F5BBD]'}
          />
        </div>
      </section>

      {/* comment  */}
      <section className='p-8'>
        {/* <CommentsList /> */}
        <CommentInput />
      </section>
    </main>
  );
};
