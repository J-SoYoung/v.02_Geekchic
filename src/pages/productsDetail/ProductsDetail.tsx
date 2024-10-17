import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { BasicButton, CommentInput, CommentsList } from '@/components';
import { addCartItems } from '@/_apis';
import { Icon_Chevron_left, Icon_FullHeart, Icon_Heart } from '@/_assets';

import { userState } from '@/_recoil';
import { utcToKoreaTimes, validateCartItems } from '@/_utils';
import {
  useProductDetail,
  useWishProductMutation,
  useWishState,
} from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ProductsDetail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const { productId } = useParams<{ productId: string }>();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const { data: currentWishState } = useWishState({
    userId: user._id,
    productId: productId as string,
  });

  const {
    data: product,
    isPending,
    isError,
  } = useProductDetail(productId as string);

  const sizeOptions = useMemo(() => product?.size.split(' / '), [product]);

  // WishList 추가, 삭제
  const wishProductMutation = useWishProductMutation(
    user._id,
    productId as string,
  );
  const onClickWishProduct = () => {
    wishProductMutation.mutate(currentWishState);
  };

  const onClickAddCart = useCallback(async () => {
    if (!validateCartItems(selectedSize, selectedQuantity)) return;
    const cartItems = {
      productId: productId as string,
      userId: user._id,
      size: selectedSize,
      selectedQuantity: selectedQuantity,
      createdAt: utcToKoreaTimes(),
    };
    try {
      const cartSaveResult = await addCartItems({ cartItems, setUser, user });
      if (cartSaveResult) {
        if (
          confirm('장바구니에 담겼습니다. 장바구니 페이지로 이동하시겠습니까?')
        ) {
          navigate(`/my/carts/${user._id}`);
        }
      } else alert('장바구니 추가에 실패했습니다. 다시 시도해 주세요.');
    } catch (error) {
      console.error('장바구니 추가 중 에러가 발생했습니다', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  }, [selectedSize, selectedQuantity, navigate, productId, setUser, user]);

  const onClickPurchaseProduct = useCallback(() => {
    if (!validateCartItems(selectedSize, selectedQuantity)) return;
    const paymentsId = uuidv4();
    const paymentsData = {
      paymentsId,
      userId: user._id,
      totalAmount: product?.price,
      paymentsProductItems: [
        {
          description: product?.description,
          image: product?.images[0],
          price: product?.price,
          productName: product?.productName,
          productId: product?.id,
          quantity: selectedQuantity,
          size: selectedSize,
        },
      ],
    };
    navigate(`/payments/${paymentsId}`, {
      state: { paymentsData, from: `/products/detail/${product?.id}` },
    });
  }, [selectedSize, selectedQuantity, navigate, productId, setUser, user]);

  const commentsUrl = `comments/${productId}`;
  const queryKeys = 'commentsData';

  if (isPending) {
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
        <div className='w-3/4 mb-8'>
          <label
            htmlFor='sizeSelect'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            사이즈 선택
          </label>
          <select
            id='sizeSelect'
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
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
        <div className='w-3/4 mb-8'>
          <label
            htmlFor='sizeSelect'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            수량 선택
          </label>
          <input
            type='number'
            placeholder='수량을 선택해주세요'
            value={selectedQuantity}
            onChange={(e) => {
              setSelectedQuantity(Number(e.target.value));
            }}
            className='border block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 text-m rounded-lg '
            min={0}
            max={product?.quantity}
          />
        </div>
        <div className='pt-4 flex'>
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

      <section className='p-8'>
        <CommentsList url={commentsUrl} queryKeys={queryKeys} />
        <CommentInput url={commentsUrl} queryKeys={queryKeys} />
      </section>
    </main>
  );
};
