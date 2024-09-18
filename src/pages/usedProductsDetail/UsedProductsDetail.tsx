import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { CommentInput, CommentsList, Skeleton } from './index';

import { ErrorPageReload, LoadingSpinner, UserProfileInfoComp } from '@/components';
import { Icon_Chevron_left } from '@/_assets';
import { addMessagesPage, checkMessage, getUsedProductDetail } from '@/_apis';
import { userState } from '@/_recoil';
import { MessageType } from '@/_typesBundle';
import { utcToKoreaTimes } from '@/_utils';

export const UsedProductsDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const isLoginUser = useRecoilValue(userState);
  const {
    data: usedProduct,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['usedProductDetail', productId],
    queryFn: () => getUsedProductDetail(productId as string),
  });
  const buyer = isLoginUser?._id !== usedProduct?.seller._id;
  const [previousMessage, setPreviousMessage] = useState<MessageType | null>(
    null,
  );
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);

  useEffect(() => {
    const checkPreviousMessage = async () => {
      const result = await checkMessage({
        buyerId: isLoginUser._id,
        productId: productId as string,
      });
      if (result !== null) setPreviousMessage(result);
      setIsLoadingMessage(false);
    };
    checkPreviousMessage();
  }, []);

  const onClickAddMessage = async () => {
    const messageId = uuidv4();
    if (previousMessage === null) {
      const messageData = {
        messageId: messageId,
        productId: productId as string,
        sellerId: usedProduct.seller._id,
        buyerId: isLoginUser._id,
        createdAt: utcToKoreaTimes(),
      };
      await addMessagesPage(messageData);
    }
    navigate(
      `/message/send/${previousMessage !== null ? previousMessage.messageId : messageId}`,
      {
        state: {
          buyerId: isLoginUser._id,
          createdAt: utcToKoreaTimes(),
          messageId:
            previousMessage !== null ? previousMessage.messageId : messageId,
          price: usedProduct.price,
          productId: usedProduct.productId,
          productImage: usedProduct.images[0],
          productName: usedProduct.productName,
          quantity: usedProduct.quantity,
          sellerId: usedProduct.seller._id,
          sellerName: usedProduct.seller.username,
        },
      },
    );
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
    <main className='text-left'>
      <button
        className='w-10 h-10 fixed top-2 cursor-pointer'
        onClick={() => navigate(-1)}
      >
        <img src={Icon_Chevron_left} alt='이전 페이지로' className='w-full' />
      </button>

      {/* image view*/}
      <section>
        <div className='w-full h-[100%]'>
          <div className='mb-6 bg-gray-200 border-red-400'>
            <img
              src={usedProduct.images[0]}
              alt={usedProduct.productName}
              className='w-[100%] h-96 object-cover'
            />
          </div>
          <div className='flex space-x-4 pl-8'>
            {usedProduct.images.map((i: string, idx: number) => (
              <div
                key={idx}
                className='w-24 h-24 flex items-center justify-center'
              >
                <img src={i} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-8 mx-8 flex justify-between items-center border-b '>
        <UserProfileInfoComp
          avatar={usedProduct.seller.avatar}
          username={usedProduct.seller.username}
          address={usedProduct.seller.address}
        />
        {buyer &&
          (!isLoadingMessage ? (
            <button onClick={onClickAddMessage} className='p-2 border'>
              {previousMessage !== null ? '쪽지 이어하기' : '쪽지보내기'}
            </button>
          ) : (
            <LoadingSpinner size='4' />
          ))}
      </section>

      <article className='p-8 pb-24'>
        {/* used products item */}
        <section className=' border-b'>
          <div className='text-xl font-bold'>{usedProduct.productName}</div>
          <div className='text-sm text-gray-500'>
            {usedProduct.createdAt[0]}
          </div>
          <div className='text-xl font-bold mt-2'>
            {usedProduct.price.toLocaleString()}원
          </div>
          <div className='flex space-x-2 mt-2'>
            <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
              {usedProduct.deliveryCharge ? '배송비 포함' : '배송비 비포함'}
            </span>
            <span className='px-2 py-1 bg-gray-200 rounded-full text-s'>
              {usedProduct.conditions === 'new' ? '새상품' : '중고상품'}
            </span>
          </div>
          <div className='py-8'>{usedProduct.description}</div>
        </section>

        <CommentsList />
        <CommentInput />
      </article>
    </main>
  );
};
