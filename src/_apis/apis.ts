import { ProductType } from '@/_typesBundle';
import { database } from './firebase';
import { get, push, ref, remove, set, update } from 'firebase/database';

export const uploadProducts = async (newProducts: ProductType) => {
  try {
    const productRef = ref(database, `products/${newProducts.id}`);
    return set(productRef, newProducts);
  } catch (error) {
    console.error('제품 업로드 에러', error);
  }
};

export const addWishList = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  try {
    const wishListRef = ref(database, `wishList/${userId}`);
    return update(wishListRef, { [productId]: true });
  } catch (error) {
    console.error('관심물품 추가 에러', error);
  }
};

export const removeWishData = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  try {
    const wishListRef = ref(database, `wishList/${userId}/${productId}`);
    return remove(wishListRef);
  } catch (error) {
    console.error('관심물품 삭제 에러', error);
  }
};

export const getWishDataState = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  try {
    const wishDataSnapshot = await get(
      ref(database, `wishList/${userId}/${productId}`),
    );
    if (wishDataSnapshot.exists()) {
      return wishDataSnapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    console.error('관심물품 상태 에러', error);
    return false;
  }
};
