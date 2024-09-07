import { UsedProductType } from '@/_typesBundle/productType';

type ValidateProductInputType = Omit<
  UsedProductType,
  'id' | 'seller' | 'createdAt' | 'isSales' | 'deliveryCharge' | 'images'
>;

export const validateProductData = (usedProducts: ValidateProductInputType) => {
  console.log(usedProducts);
  if (
    !usedProducts.description ||
    !usedProducts.productName ||
    !usedProducts.conditions ||
    !usedProducts.price ||
    !usedProducts.quantity ||
    !usedProducts.size
  ) {
    return false;
  } else {
    return true;
  }
};