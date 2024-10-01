import React from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { CartItemType } from '@/_typesBundle';


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
      <div className='flex flex-col items-start py-4'>
        <p className='text-m text-gray-500 mb-2'>{cartItem.createdAt[0]}</p>
        <div className='w-full flex justify-between'>
          <div className='flex items-center'>
            <img
              src={cartItem.images[0]}
              alt={cartItem.productName}
              className='w-24 h-24 mr-4 object-cover rounded-md'
            />
            <div className='flex flex-col items-start'>
              <h2 className='text-sm font-bold'>{cartItem.productName}</h2>
              <span className='text-sm text-gray-500'>
                size : {cartItem.size}
              </span>
              <p className='text-base font-bold'>
                {(cartItem.price * cartItem.selectedQuantity).toLocaleString()}
                원
              </p>
            </div>
          </div>
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
      </div>
    );
  },
);
