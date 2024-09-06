import { Fragment } from 'react/jsx-runtime';
import { UsedProductType } from '@/_typesBundle/productType';
import { ProductCart } from './ProductCart';

interface ProductsListProps {
  usedProducts: UsedProductType[];
}

export const ProductsList = ({ usedProducts }: ProductsListProps) => {
  return (
    <div className='grid grid-cols-2 gap-4 mt-4 mb-24'>
      {usedProducts?.map((usedProduct) => {
        return (
          <Fragment key={usedProduct.id}>
            <ProductCart usedProduct={usedProduct} />
          </Fragment>
        );
      })}
    </div>
  );
};