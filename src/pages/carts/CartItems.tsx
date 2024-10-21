import React from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { CartItemType } from '@/_typesBundle';
import { MyProductCard } from '@/components';

interface CartItemProps {
  cartItem: CartItemType; // cartItem의 타입을 명확히 정의해주세요
  onUpdateQuantity: (idx: number, newQuantity: number) => void;
  idx: number;
}

export const CartItems = React.memo(
  ({ cartItem, onUpdateQuantity, idx }: CartItemProps) => {
    const handleIncrement = () => {
      if (cartItem.selectedQuantity < cartItem.quantity)
        onUpdateQuantity(idx, cartItem.selectedQuantity + 1);
    };

    const handleDecrement = () => {
      if (cartItem.selectedQuantity > 1) {
        onUpdateQuantity(idx, cartItem.selectedQuantity - 1);
      }
    };
    return (
      <div className='w-full flex justify-between border-b'>
        <MyProductCard
          key={idx}
          createdAt={cartItem.createdAt}
          productImage={cartItem.images[0]}
          productName={cartItem.productName}
          size={cartItem.size}
          price={cartItem.price}
        />
        <div className='flex items-center'>
          <CiCircleMinus
            onClick={handleDecrement}
            className='w-6 h-6 cursor-pointer'
          />
          <span className='inline-block w-10 h-6 text-center'>
            {cartItem.selectedQuantity}
          </span>
          <CiCirclePlus
            onClick={handleIncrement}
            className='w-6 h-6 cursor-pointer'
          />
        </div>
      </div>
    );
  },
);
