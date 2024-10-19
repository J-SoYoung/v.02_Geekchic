import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { Skeleton } from './Skeleton';

import {
  BackToMoveButton,
  CommentInput,
  CommentsList,
  ErrorPageReload,
  LoadingSpinner,
  UserProfileInfoComp,
} from '@/components';

import { addMessagesPage, checkMessage } from '@/_apis';
import { userState } from '@/_recoil';
import { MessageType, UsedProductType } from '@/_typesBundle';
import { utcToKoreaTimes } from '@/_utils';
import { useProductDetail } from '@/hooks';
import { ProductImageGallery } from '../productsDetail';
import ProductInfo from './ProductInfo';

export const UsedProductsDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState(userState);
  const [previousMessage, setPreviousMessage] = useState<MessageType | null>(
    null,
  );
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);

  const { data, isPending, isError } = useProductDetail({
    productId: productId as string,
    queryKey: 'usedProductDetail',
    table: 'usedProducts',
  });

  const usedProduct =
    data && 'seller' in data ? (data as UsedProductType) : null;

  const seller = loginUser?._id === usedProduct?.seller._id;
  const isSoldOut = usedProduct && usedProduct.quantity < 1;

  useEffect(() => {
    const checkPreviousMessage = async () => {
      const result = await checkMessage({
        buyerId: loginUser._id,
        productId: productId as string,
      });
      if (result !== null) setPreviousMessage(result);
      setIsLoadingMessage(false);
    };
    checkPreviousMessage();
  }, []);

  const onClickAddMessagePage = async () => {
    const messageId = uuidv4();
    if (usedProduct) {
      if (previousMessage === null) {
        const messageData = {
          messageId: messageId,
          productId: productId as string,
          sellerId: usedProduct?.seller._id as string,
          buyerId: loginUser._id,
          createdAt: utcToKoreaTimes(),
          salesStatus: 'initialized',
        };
        await addMessagesPage(messageData, loginUser, setLoginUser);
      }
      navigate(
        `/message/send/${previousMessage !== null ? previousMessage.messageId : messageId}`,
        {
          state: {
            buyerId: loginUser._id,
            createdAt: utcToKoreaTimes(),
            messageId:
              previousMessage !== null ? previousMessage.messageId : messageId,
            price: usedProduct.price,
            productId: usedProduct.id,
            productImage: usedProduct.images[0],
            productName: usedProduct.productName,
            quantity: usedProduct.quantity,
            sellerId: usedProduct.seller._id,
            sellerName: usedProduct.seller.username,
          },
        },
      );
    }
  };

  if (isPending) {
    return <Skeleton />;
  }

  if (isError)
    return (
      <ErrorPageReload
        content='데이터를 가져오는 동안 문제가 발생했습니다'
        pageName={'중고 상세'}
        linkTo={'/used'}
        movePage='중고 메인 페이지'
      />
    );

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        !!usedProduct && (
          <main className='text-left'>
            <BackToMoveButton />
            <ProductImageGallery
              images={usedProduct.images}
              productName={usedProduct.productName}
            />

            {/* 쪽지 보내기 및 판매자정보 */}
            <section className='py-8 mx-8 flex justify-between items-center border-b '>
              <UserProfileInfoComp
                avatar={usedProduct.seller.avatar}
                username={usedProduct.seller.username}
                address={usedProduct.seller.address}
              />
              {isSoldOut ? (
                <button className='text-red-500'>품절입니다</button>
              ) : seller ? (
                <button onClick={() => navigate(`/used/edit/${productId}`)}>
                  수정하기
                </button>
              ) : !isLoadingMessage ? (
                <button onClick={onClickAddMessagePage} className='p-2 border'>
                  {previousMessage === null ? '쪽지보내기' : '쪽지 이어하기'}
                </button>
              ) : (
                <LoadingSpinner size='4' />
              )}
            </section>

            <section className='p-8'>
              <ProductInfo
                productName={usedProduct.productName}
                createdAt={usedProduct.createdAt[0]}
                price={usedProduct.price}
                deliveryCharge={usedProduct.deliveryCharge}
                conditions={usedProduct.conditions}
                description={usedProduct.description}
              />
            </section>

            <section className='p-8 pb-24'>
              <CommentsList
                url={`usedComments/${productId}`}
                queryKeys={'usedComments'}
              />
              <CommentInput
                url={`usedComments/${productId}`}
                queryKeys={'usedComments'}
              />
            </section>
          </main>
        )
      )}
    </>
  );
};
