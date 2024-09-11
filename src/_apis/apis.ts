import { get, push, ref, remove, set, update } from 'firebase/database';
import { database } from './firebase';
import {
  CommentType,
  SellsItemType,
  UsedProductType,
} from '@/_typesBundle';

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
export const getUsedProductDetail = async (productId: string) => {
  try {
    const snapshot = await get(ref(database, `usedProducts/${productId}`));
    if (snapshot.exists()) return snapshot.val();
  } catch (error) {
    console.error('중고 상세 페이지 데이터 로드 에러', error);
    return {};
  }
};

// ⭕API getAPI 공용 사용하게 추상화하기
// ⭕API 마이페이지 연결된 4개 데이터로드 공용으로 사용 가능할듯.
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

// UsedComment API
export interface addUsedCommentProps {
  productId: string;
  comment: CommentType;
}
export interface removeUsedCommentProps {
  productId: string;
  commentId: string;
}
export interface EditUsedCommentProps {
  productId: string;
  commentId: string;
  editCommentData: CommentType;
}

export const getUsedComment = async (productId: string) => {
  try {
    const commentsSnapshot = await get(
      ref(database, `usedComments/${productId}`),
    );
    if (commentsSnapshot.exists()) {
      const data = Object.values(commentsSnapshot.val()) as CommentType[];
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error('댓글 불러오기 에러', error);
    return [];
  }
};

export const addUsedComment = ({ productId, comment }: addUsedCommentProps) => {
  try {
    const commentRef = ref(database, `usedComments/${productId}`);
    const newCommentRef = push(commentRef);
    return set(newCommentRef, { ...comment, commentId: newCommentRef.key });
  } catch (error) {
    console.error('중고제품 댓글 추가 에러', error);
  }
};

export const removeUsedComment = async ({
  productId,
  commentId,
}: removeUsedCommentProps) => {
  try {
    const commentRef = ref(database, `usedComments/${productId}/${commentId}`);
    return remove(commentRef);
  } catch (error) {
    console.error('중고제품 댓글삭제 에러', error);
  }
};

export const editUsedComment = async ({
  productId,
  commentId,
  editCommentData,
}: EditUsedCommentProps) => {
  try {
    const commentRef = ref(database, `usedComments/${productId}/${commentId}`);
    return await update(commentRef, editCommentData);
  } catch (error) {
    console.error('중고제품 댓글수정 에러', error);
  }
};
