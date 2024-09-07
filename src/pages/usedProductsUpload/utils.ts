import { UsedProductType } from '@/_typesBundle/productType';
import { UserDataType } from '@/_typesBundle/userType';

type ValidateProductInputType = Omit<
  UsedProductType,
  'id' | 'seller' | 'createdAt' | 'isSales' | 'deliveryCharge' | 'images'
>;

export const validateProductData = (usedProducts: ValidateProductInputType) => {
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

export const validateUserData = (user: UserDataType) => {
  if (!user.address || !user.phone || !user.avatar) {
    return false;
  } else {
    return true;
  }
};
