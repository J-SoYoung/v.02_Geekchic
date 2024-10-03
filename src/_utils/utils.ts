import { ProductType, UsedProductType } from '@/_typesBundle';
import { UserDataType } from '@/_typesBundle';

type ValidateUsedProductInputType = Omit<
  UsedProductType,
  'id' | 'seller' | 'createdAt' | 'isSales' | 'deliveryCharge' | 'images'
>;

type ValidateProductInputType = Omit<
  ProductType,
  'id' | 'createdAt' | 'images'
>;

export const validateUsedProductData = (
  usedProducts: ValidateUsedProductInputType,
) => {
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

export const validateProductData = (products: ValidateProductInputType) => {
  if (
    !products.description ||
    !products.productName ||
    !products.price ||
    !products.quantity ||
    !products.size ||
    !products.categories
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

export const validateComment = (comment: string) => {
  if (comment.length < 5) {
    return alert('댓글은 5자 이상 입력해주세요');
  } else {
    return true;
  }
};

export const validateCartItems = (size: string, quantity: number) => {
  if (size === '' || quantity === 0) {
    return alert('구매하시려는 사이즈 또는 수량을 확인해주세요');
  } else {
    return true;
  }
};

export const utcToKoreaTimes = () => {
  const currentDateUTC = new Date();
  const koreaTime = new Date(currentDateUTC.getTime() + 9 * 60 * 60 * 1000);
  const koreaFullTime = koreaTime.toISOString().split('T');

  const [createdDate, timeWithMilliseconds] = koreaFullTime;
  const createdTime = timeWithMilliseconds.split('.')[0];
  return [createdDate, createdTime];
};
