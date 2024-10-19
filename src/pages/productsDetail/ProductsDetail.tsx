import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { BasicButton, CommentInput, CommentsList } from '@/components';
import { Icon_Chevron_left } from '@/_assets';

import { userState } from '@/_recoil';
import { utcToKoreaTimes, validateCartItems } from '@/_utils';
import {
  useAddToCartMutation,
  useProductDetail,
  useWishProductMutation,
  useWishState,
} from '@/hooks';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import { WishProductIcon } from './WishProductIcon';
import { Skeleton } from './Skeleton';

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
  const sizeOptions = useMemo(() => product?.size?.split(' / '), [product]);

  const wishProductMutation = useWishProductMutation(
    user._id,
    productId as string,
  );
  const onClickWishProduct = useCallback(() => {
    wishProductMutation.mutate(currentWishState);
  }, [wishProductMutation, currentWishState]);

  const addToCartMutation = useAddToCartMutation();
  const onClickAddCart = useCallback(async () => {
    if (!validateCartItems(selectedSize, selectedQuantity)) return;
    const cartItems = {
      productId: productId as string,
      userId: user._id,
      size: selectedSize,
      selectedQuantity: selectedQuantity,
      createdAt: utcToKoreaTimes(),
    };
    addToCartMutation.mutate({
      cartItems,
      setUser,
      user,
      navigate,
    });
  }, [selectedSize, selectedQuantity, productId, user, addToCartMutation]);

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
  }, [selectedSize, selectedQuantity, productId, product, user, navigate]);

  const commentsUrl = `comments/${productId}`;
  const queryKeys = 'commentsData';

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        !!product && (
          <main className='text-left'>
            <button
              className='w-10 h-10 fixed top-2 cursor-pointer'
              onClick={() => navigate(-1)}
            >
              <img
                src={Icon_Chevron_left}
                alt='이전 페이지로'
                className='w-full'
              />
            </button>

            <section className='relative'>
              <ProductImageGallery
                images={product.images}
                productName={product.productName}
              />
              <WishProductIcon
                currentWishState={currentWishState}
                onClickWishProduct={onClickWishProduct}
              />
              <ProductInfo
                productName={product.productName}
                price={product.price}
                description={product.description}
              />
            </section>

            <section className='p-8'>
              <SizeSelector
                sizeOptions={sizeOptions}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <QuantitySelector
                quantity={product.quantity}
                selectedQuantity={selectedQuantity}
                setSelectedQuantity={setSelectedQuantity}
              />
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
        )
      )}
    </>
  );
};
