import { defaultImage } from '@/_example/example';
import { Layout } from '@/components/Layout';
import { MyProductCard } from '@/components/MyProductCard';

const products = [
  {
    id: 1,
    productName: '나이키 V2K 런',
    size: '270',
    price: 139000,
    image: defaultImage,
  },
  {
    id: 1,
    productName: '나이키 V2K 런',
    size: '270',
    price: 139000,
    image: defaultImage,
  },
  {
    id: 1,
    productName: '나이키 V2K 런',
    size: '270',
    price: 139000,
    image: defaultImage,
  },
];
export const PurchaseList = () => {
  return (
    <Layout title='구매내역'>
      <div>
        {products.map((product) => (
          <MyProductCard
            key={product.id}
            productName={product.productName}
            size={product.size}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </Layout>
  );
};
