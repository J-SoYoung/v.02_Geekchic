import { get, ref, update } from 'firebase/database';
import { database } from './firebase';
import { SellsItemType, UsedProductType } from '@/_typesBundle/productType';

export const uploadUsedProducts = async (
  updateUsedProducts: UsedProductType,
) => {
  const { id, createdAt, seller, images, productName, price, quantity } =
    updateUsedProducts;

  const userSnapshot = await get(
    ref(database, `users/${updateUsedProducts.seller._id}`),
  );
  if (userSnapshot.exists()) {
    const userData = userSnapshot.val();
    const updatedListSells = (userData.listSells || 0) + 1;
    const userSellsData = {
      userId: seller._id,
      usedProductId: id,
      uploadDate: createdAt,
      isSales: true, // 판매중(true), 품절(false)
      image: images[0],
      productName,
      price,
      quantity,
      sellsQuantity: 0,
    };

    // 업데이트 목록 : (1)중고제품, (2)유저데이터>판매목록 수량, (3)판매리스트>유저
    try {
      const updates = {
        [`usedProducts/${updateUsedProducts.id}`]: updateUsedProducts,
        [`userSellList/${updateUsedProducts.seller._id}/${updateUsedProducts.id}`]:
          userSellsData,
        [`users/${updateUsedProducts.seller._id}/listSells`]: updatedListSells, // 판매목록 개수 업데이트
      };
      await update(ref(database), updates);
    } catch (error) {
      console.error('중고제품 업로드 에러', error);
    }
  }
};

export const searchUsedProducts = async (
  queryString: string,
): Promise<UsedProductType[]> => {
  try {
    const snapshot = await get(ref(database, `usedProducts`));
    if (snapshot.exists()) {
      const dataArr: UsedProductType[] = Object.values(snapshot.val());
      const filterData = dataArr.filter((data) => {
        return (
          data.productName &&
          data.productName.toLowerCase().includes(queryString.toLowerCase())
        );
      });
      return filterData;
    }
    return [];
  } catch (error) {
    console.error('중고 제품 검색 에러', error);
    return [];
  }
};

export const getUsedProducts = async (): Promise<UsedProductType[]> => {
  try {
    const snapshot = await get(ref(database, `usedProducts`));
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val()) as UsedProductType[];
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error('중고 제품 로드 에러', error);
    return [];
  }
};

export const getUsedProductDetail = async (itemId: string) => {
  try {
    const snapshot = await get(ref(database, `usedProducts/${itemId}`));
    if (snapshot.exists()) return snapshot.val();
  } catch (error) {
    console.error('중고 상세 페이지 데이터 로드 에러', error);
    return {};
  }
};

// ⭕getAPI 공용 사용 가능할듯 => main데이터, 판매데이터 url만 다름!!
// ⭕마이페이지 연결된 4개 데이터로드 공용으로 사용 가능할듯.
export const getMyPageInfo = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `userSellList/${userId}`));
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val()) as SellsItemType[];
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
      );
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error('중고 제품 로드 에러', error);
    return [];
  }
};
