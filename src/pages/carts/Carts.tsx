import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { BasicButton, Layout } from '@/components';
import { CartItems } from './CartItems';
import { getCartLists } from '@/_apis';
import { CartItemType } from '@/_typesBundle';

export const Carts = () => {
  const { userId } = useParams<string>();
  const navigate = useNavigate();
  const {
    data: cartItems,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['cartList', userId as string],
    queryFn: async () => await getCartLists(userId as string),
    enabled: !!userId,
  });
  const [updatedCartItems, setUpdatedCartItems] = useState<CartItemType[]>(
    cartItems || [],
  );
  console.log(cartItems);
  useEffect(() => {
    if (cartItems) {
      setUpdatedCartItems(cartItems);
    }
  }, [cartItems]);

  const totalPrice = updatedCartItems.reduce(
    (acc, item) => acc + item.price * item.selectedQuantity,
    0,
  );

  const onClickUpdateQuantity = useCallback(
    (idx: number, newQuantity: number) => {
      console.log('handleUpdateQuantity called, 함수생성중');
      setUpdatedCartItems((prevItems) =>
        prevItems.map((item, i) =>
          i === idx ? { ...item, selectedQuantity: newQuantity } : item,
        ),
      );
    },
    [],
  );

  const onClickMovePaymentsPage = async () => {
    const paymentsId = uuidv4();
    const paymentsProductItems = updatedCartItems.map((item) => ({
      cartId: item.cartId,
      description: item.description,
      image: item.images[0],
      price: item.price,
      productName: item.productName,
      productId: item.id,
      quantity: item.selectedQuantity,
      size: item.size,
    }));

    const paymentsData = {
      paymentsId,
      userId: userId as string,
      totalAmount: totalPrice,
      paymentsProductItems, 
    };
    navigate(`/payments/${paymentsId}`, { state: { paymentsData } });
  };

  return (
    <Layout title='장바구니'>
      {isPending ? (
        <p>로딩중</p>
      ) : cartItems === undefined ? (
        <div>
          <p>장바구니가 비었습니다.</p>
          <Link to='/' className='my-4 font-bold'>제품 구경하러 가기</Link>
        </div>
      ) : (
        <div>
          <div className='border-b py-8'>
            {updatedCartItems?.map((cartItem, idx) => {
              return (
                <CartItems
                  key={idx}
                  cartItem={cartItem}
                  onUpdateQuantity={onClickUpdateQuantity}
                  idx={idx}
                />
              );
            })}
          </div>
          <div className='py-8'>
            <h2 className='mb-8 text-xl font-bold'>
              총 가격: {totalPrice.toLocaleString()}원
            </h2>
            <BasicButton
              onClickFunc={onClickMovePaymentsPage}
              text='결제하기'
              bg='bg-[#8F5BBD]'
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
