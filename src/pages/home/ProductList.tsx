import { ProductType } from "@/_typesBundle"
import { ProductCard } from "./ProductCard"

export const ProductList = ({products}:{products : ProductType[]|undefined}) =>{
  return(
    <div className='grid grid-cols-4 gap-4 mt-4 mb-24'>
    {products &&
      products.map((product: ProductType) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.images[0]}
          productName={product.productName}
        />
      ))}
  </div>
  )
}