import { Link } from 'react-router-dom';
import { UsedProductType } from '@/_typesBundle/productType';

interface ProductProps {
  usedProduct: UsedProductType;
}

export const ProductCart = ({ usedProduct }: ProductProps) => {
  const isSoldout = usedProduct.quantity < 1; // TEST

  return (
    <section>
      <Link
        to={`/used/detail/example1`}
        className={`rounded-lg cursor-pointer relative ${isSoldout && 'opacity-50'}`}
      >
        {/* <IsSeller sellerId={usedProduct?.seller.sellerId} /> */}
        {usedProduct.images ? (
          <img
            className='w-full h-48 object-cover rounded-md mb-2'
            src={usedProduct.images[0]}
            alt={usedProduct.productName}
          />
        ) : (
          <img
            src='/'
            className='w-full h-48 object-cover rounded-md mb-2 border'
          />
        )}
        <div className='flex'>
          <h2 className='text-lg font-bold mr-1 '>{usedProduct.productName}</h2>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-full flex text-gray-500'>
            <p>{usedProduct.price.toLocaleString()}원</p>
            <p>
              {isSoldout ? '( 품절 )' : `( ${usedProduct.quantity}개 남음 )`}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
};
