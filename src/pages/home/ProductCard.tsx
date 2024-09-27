import { Link } from 'react-router-dom';

interface HomeProductViewType {
  key: string;
  id: string;
  image: string;
  productName: string;
}
export const ProductCard = ({
  id,
  image,
  productName,
}: HomeProductViewType) => {
  return (
    <Link to={`/products/detail/${id}`} className='w-[120px] h-[160px] block border'>
      <img src={image} alt={productName} className='w-full h-[130px]' />
      <p>{productName}</p>
    </Link>
  );
};
