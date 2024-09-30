import { ProductType, UserDataType } from '@/_typesBundle';
import { database } from './firebase';
import { get, ref, remove, set, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { SetterOrUpdater } from 'recoil';

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

export const getWishList = async ({ userId }: { userId: string }) => {
  try {
    const wishDataSnapshot = await get(ref(database, `wishList/${userId}`));
    if (wishDataSnapshot.exists()) {
      const wishProductIds = wishDataSnapshot.val();

      const productPromises = Object.keys(wishProductIds).map(
        async (productId) => {
          const productSnapshot = await get(
            ref(database, `products/${productId}`),
          );
          if (productSnapshot.exists()) {
            return productSnapshot.val();
          } else {
            return [];
          }
        },
      );
      return await Promise.all(productPromises);
    } else {
      console.log('위시리스트가 존재하지 않습니다.');
      return [];
    }
  } catch (error) {
    console.error('관심물품 리스트 가져오기 에러', error);
    return [];
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

interface CartItemsType {
  productId: string;
  userId: string;
  size: string;
  quantity: number;
  createdAt: string[];
}
interface AddCartItemsType {
  cartItems: CartItemsType;
  setUser: SetterOrUpdater<UserDataType>;
  user: UserDataType;
}
export const addCartItems = async ({
  cartItems,
  setUser,
  user,
}: AddCartItemsType) => {
  const { userId, ...filterCartData } = cartItems;
  const cartsId = uuidv4();

  try {
    const userSnapshot = await get(ref(database, `users/${userId}`));
    const userData = userSnapshot.val();
    const updatedListCarts = (userData.listCarts || 0) + 1;

    const updates = {
      [`cartList/${userId}/${cartsId}`]: { ...filterCartData },
      [`users/${userId}/listCarts`]: updatedListCarts,
    };
    await update(ref(database), updates);
    setUser({ ...user, listCarts: updatedListCarts });
    return true;
  } catch (error) {
    console.error('장바구니 담기 에러', error);
    return false;
  }
};
