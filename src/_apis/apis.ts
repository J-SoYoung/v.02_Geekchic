import { get, ref, set, update } from 'firebase/database';
import { database } from './firebase';
import { UsedProductsType } from '@/_typesBundle/productType';

export const uploadUsedProducts = async (
  updateUsedProducts: UsedProductsType,
) => {
  const { id, createdAt, seller, images, productName, price, quantity } =
    updateUsedProducts;

  const userSellData = {
    userId: seller._id,
    usedProductId: id,
    uploadDate: createdAt,
    isSales: true, // 판매중(true), 품절(false)
    image: images[0],
    productName,
    price,
    quantity,
  };

  try {
    const updates = {
      [`usedProducts/${updateUsedProducts.id}`]: updateUsedProducts,
      [`userSellList/${updateUsedProducts.seller._id}/${updateUsedProducts.id}`]:
        userSellData,
    };
    await update(ref(database), updates);

  } catch (error) {
    console.error('중고제품 업로드 에러', error);
  }
};
