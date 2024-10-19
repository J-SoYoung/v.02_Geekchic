import { memo } from 'react';

interface ProductInfoProps {
  productName: string;
  createdAt: string;
  price: number;
  description: string;
  deliveryCharge: 'include' | 'notInclude';
  conditions: 'new' | 'used';
}
const ProductInfo = ({
  productName,
  createdAt,
  price,
  deliveryCharge,
  conditions,
  description,
}: ProductInfoProps) => {
  return (
    <section className=' border-b'>
      <div className='text-xl font-bold'>{productName}</div>
      <div className='text-sm text-gray-500'>{createdAt}</div>
      <div className='text-xl font-bold mt-2'>{price.toLocaleString()}원</div>
      <div className='flex space-x-2 mt-2'>
        <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
          {deliveryCharge === 'include' ? '배송비 포함' : '배송비 비포함'}
        </span>
        <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
          {conditions === 'new' ? '새상품' : '중고상품'}
        </span>
      </div>
      <div className='py-8'>{description}</div>
    </section>
  );
};
export default memo(ProductInfo);
