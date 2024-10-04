import {
  CommentType,
  PaymentsDataInfoType,
  ProductType,
  UsedProductType,
  UserDataType,
} from '@/_typesBundle';
import { database } from './firebase';
import { get, push, ref, remove, set, update } from 'firebase/database';
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

// 관심물픔 [ 추가 / 제거 / 리스트 가져오기 / 한개 가져오기 ]
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
  selectedQuantity: number;
  createdAt: string[];
}
interface AddCartItemsType {
  cartItems: CartItemsType;
  setUser: SetterOrUpdater<UserDataType>;
  user: UserDataType;
}

// 장바구니 
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

type CartDataType = Omit<CartItemsType, 'userId'>;
export const getCartLists = async (userId: string) => {
  try {
    const cartDataSnapshot = await get(ref(database, `cartList/${userId}`));
    if (cartDataSnapshot.exists()) {
      const cartProductIds: Record<string, CartDataType> =
        cartDataSnapshot.val();

      const productPromises = Object.entries(cartProductIds).map(
        async ([cartId, cartData]) => {
          const productId = cartData.productId;
          const productSnapshot = await get(
            ref(database, `products/${productId}`),
          );
          return {
            cartId,
            ...productSnapshot.val(),
            size: cartData.size,
            selectedQuantity: cartData.selectedQuantity,
            createdAt: cartData.createdAt,
          };
        },
      );
      return await Promise.all(productPromises);
    }
  } catch (error) {
    console.error('장바구니 리스트 불러오기 에러', error);
  }
};

// 바로 구매하기
export const paymentProducts = async (
  paymentInfo: PaymentsDataInfoType,
  user: UserDataType,
  setUser: SetterOrUpdater<UserDataType>,
) => {
  try {
    // 제품product 수량 업데이트
    // 유저user 구매목록/장바구니 데이터 추가 및 삭제
    // 구매목록purchaseList db 추가
    // 장바구니cartList 목록 삭제
    const { paymentsData } = paymentInfo;
    const { userId, paymentsId } = paymentsData;

    // 제품 수량 업데이트, 장바구니 데이터 삭제
    const productQuantityUpdate = paymentsData.paymentsProductItems.map(
      async (item) => {
        const productId = item.productId;
        const productSnapshot = await get(
          ref(database, `products/${productId}`),
        );
        if (productSnapshot.exists()) {
          const productData = productSnapshot.val();
          const updatedQuantity = productData.quantity - item.quantity;

          return {
            [`products/${productId}/quantity`]: updatedQuantity,
            [`cartList/${userId}/${item.cartId}`]: null,
          };
        }
      },
    );
    const updates = await Promise.all(productQuantityUpdate);

    // 유저데이터 업데이트 - 구매목록/장바구니 갯수
    const userSnapshot = await get(
      ref(database, `users/${userId}/listPurchases`),
    );
    const currentListPurchases = userSnapshot.exists() ? userSnapshot.val() : 0;
    const currentListCarts = userSnapshot.exists() ? userSnapshot.val() : 0;

    let updatesDatabase = {
      [`users/${userId}/listPurchases`]: currentListPurchases + 1,
      [`purchaseList/${userId}/${paymentsId}`]: { ...paymentInfo },
    };
    updates.forEach((update) => {
      if (update) {
        Object.assign(updatesDatabase, update);
      }
    });

    await update(ref(database), updatesDatabase);
    setUser({
      // recoil업데이트
      ...user,
      listPurchases: currentListPurchases + 1,
      listCarts: currentListCarts - paymentsData.paymentsProductItems.length,
    });
    return true;
  } catch (error) {
    console.error('제품 결제하기 에러', error);
    return false;
  }
};

// 댓글 [ 추가 / 가져오기 / 삭제 / 수정 ] , 중고물품이랑 같이 사용
export const addComment = ({
  comment,
  url,
}: {
  comment: CommentType;
  url: string;
}) => {
  try {
    console.log(comment, url);
    const commentRef = ref(database, `${url}`);
    const newCommentRef = push(commentRef);
    return set(newCommentRef, { ...comment, commentId: newCommentRef.key });
  } catch (error) {
    console.error('댓글 추가 에러', error);
  }
};

export const getComment = async (url: string) => {
  try {
    const commentsSnapshot = await get(ref(database, `${url}`));
    if (commentsSnapshot.exists()) {
      const data = Object.values(commentsSnapshot.val()) as CommentType[];
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt.join(' ')).getTime() -
          new Date(a.createdAt.join(' ')).getTime(),
      );
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error('댓글 불러 오기 에러', error);
    return [];
  }
};

export const removeComment = async (url: string) => {
  try {
    const commentRef = ref(database, `${url}`);
    return remove(commentRef);
  } catch (error) {
    console.error('제품 댓글 삭제 에러', error);
  }
};

export const editComments = async ({
  url,
  editCommentData,
}: {
  url: string;
  editCommentData: CommentType;
}) => {
  try {
    const commentRef = ref(database, `${url}`);
    return await update(commentRef, editCommentData);
  } catch (error) {
    console.error('제품 댓글 수정 에러', error);
  }
};

export interface SearchResult {
  id: string;
  productName: string;
  price: number;
  images: string[];
  quantity: number;
  isSoldOut: boolean;
}

export const searchProducts = async ({
  searchQuery,
  url,
}: {
  searchQuery: string;
  url: string;
}): Promise<SearchResult[]> => {
  try {
    console.log(searchQuery, url);
    const snapshot = await get(ref(database, url));
    if (snapshot.exists()) {
      const dataArr = Object.values(snapshot.val()) as Array<UsedProductType | ProductType>;
      const filterData = dataArr
        .filter((data) => {
          return (
            data.productName &&
            data.productName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
        .map((data) => {
          return {
            id: data.id || '',
            productName: data.productName || '이름 없음',
            price: data.price || 0,
            images: data.images || [],
            quantity: data.quantity || 0,
            isSoldOut: data.quantity < 1,
          };
        });
      console.log('firebase통신', filterData);
      return filterData;
    }
    return [];
  } catch (error) {
    console.error('제품 검색 에러', error);
    return [];
  }
};
