import { memo } from 'react';

interface ProductInfoProps {
  productName: string;
  price: number;
  description: string;
}
const ProductInfo = ({ productName, price, description }: ProductInfoProps) => {
  return (
    <section className='p-8 pb-0'>
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <p className='mb-1 text-lg'>{productName}</p>
          <p className='text-2xl'>{price}원</p>
        </div>
      </div>
      <p>{description}</p>
    </section>
  );
};
export default memo(ProductInfo);
