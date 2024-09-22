import { UsedProductType } from '@/_typesBundle';
import { UserDataType } from '@/_typesBundle';

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

export const validateUsedComment = (comment: string) => {
  if (comment.length < 5) {
    return alert('댓글은 5자 이상 입력해주세요');
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
