import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';

import {
  ErrorPageReload,
  Layout,
  LoadingSpinner,
  UserProfileInfoComp,
} from '@/components';
import { userState } from '@/_recoil';
import {
  sendMessages,
  getMessages,
  salesProducts,
  getUsedPageMainInfo,
} from '@/_apis';
import {
  MessageResultType,
  MessagesInfoType,
  SalesInfoType,
} from '@/_typesBundle';
import { utcToKoreaTimes } from '@/_utils';

export const UsedMessage = () => {
  const queryClient = useQueryClient();
  const [loginUser, setLoginUser] = useRecoilState(userState);
  const location = useLocation();
  const {
    buyerId,
    createdAt,
    messageId,
    price,
    productId,
    productImage,
    productName,
    quantity,
    sellerId,
    sellerName,
  } = location.state || {};

  const [newMessage, setNewMessage] = useState('');
  const [productsQuantity, setProductsQuantity] = useState<number>(1);

  const { data: messageInfo } = useQuery({
    queryKey: ['usedMessageInfo', messageId],
    queryFn: async () =>
      await getUsedPageMainInfo<MessageResultType>({
        table: 'usedMessages',
        id: messageId as string,
      }),
  });

  const isSalesCompleted = messageInfo?.salesStatus === 'completed';

  const {
    data: messages,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['usedMessages', messageId],
    queryFn: async () => await getMessages(messageId),
    retry: 3,
    retryDelay: 1000,
  });

  interface sendMessagesMutationType {
    currentMessages: MessagesInfoType;
    messageId: string;
  }
  const sendMessagesMutation = useMutation({
    mutationFn: async ({
      currentMessages,
      messageId,
    }: sendMessagesMutationType) => {
      await sendMessages({ currentMessages, messageId });
    },
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries(
        {
          queryKey: ['usedMessages', messageId],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });

  const onClickSendMessage = () => {
    const currentMessages: MessagesInfoType = {
      senderId: loginUser._id,
      content: newMessage,
      timestamp: utcToKoreaTimes(),
    };
    sendMessagesMutation.mutate({
      currentMessages,
      messageId: messageId as string,
    });
  };

  const onClickSalesProducts = () => {
    const salesInfo: SalesInfoType = {
      buyerId,
      sellerId,
      sellerName,
      productsQuantity,
      quantity,
      productId,
      productImage,
      productName,
      price,
      createdAt: utcToKoreaTimes(),
    };
    salesProducts(salesInfo, setLoginUser, loginUser);
  };

  if (isError) {
    return (
      <ErrorPageReload
        content='데이터를 가져오는 동안 문제가 발생했습니다'
        pageName={'메세지'}
      />
    );
  }

  return (
    <Layout title={'쪽지 보내기'}>
      <div className='min-h-screen flex flex-col'>
        {/* 판매자정보 */}
        <section className='border p-4 mb-8 flex justify-between items-center bg-white'>
          <div className='flex'>
            <img
              src={productImage}
              alt='Product'
              className='w-20 h-20 mr-4 rounded-md object-cover'
            />
            <div className='text-left'>
              <div className='text-lg font-bold'>판매자 : {sellerName}</div>
              <div className='text-gray-500'>{productName}</div>
              <div className='text-lg font-semibold text-[#8F5BBD]'>
                {price.toLocaleString()}원
              </div>
            </div>
          </div>
          {loginUser._id === sellerId && !isSalesCompleted && (
            <div>
              <input
                className='w-10 border text-center'
                type='number'
                value={productsQuantity}
                onChange={(e) => setProductsQuantity(Number(e.target.value))}
                min={1}
                max={quantity}
              />
              <button className='p-2' onClick={onClickSalesProducts}>
                판매하기
              </button>
            </div>
          )}
        </section>

        {/* messages */}
        <section className='w-full flex flex-col'>
          <div>
            {isPending ? (
              <LoadingSpinner size='6' />
            ) : (
              messages &&
              messages.map((message, idx) => {
                const isLoginUserMessage = message.senderId === loginUser._id;
                return (
                  <div
                    key={idx}
                    className={`w-3/5 p-3 mb-4 rounded-lg ${
                      isLoginUserMessage
                        ? 'ml-auto bg-[#b788e0] text-white text-right'
                        : 'mr-auto bg-gray-200 text-left'
                    }`}
                  >
                    <div>
                      <UserProfileInfoComp
                        avatar={message.avatar}
                        username={message.username}
                      />
                      <p>{message.content}</p>
                    </div>
                    <div className='text-xs'>{message.timestamp[0]}</div>
                  </div>
                );
              })
            )}
          </div>
          {isSalesCompleted && (
            <div className='py-8'>
              -------------------------- 판매 완료 되었습니다
              --------------------------
            </div>
          )}
        </section>

        {/* 대화 입력창 */}
        <section>
          <div className='w-[532px] flex items-center fixed bottom-24'>
            <textarea
              className='border w-full p-2 resize-none outline-0'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='메시지를 입력하세요'
              disabled={isSalesCompleted}
            />
            <button
              onClick={onClickSendMessage}
              className={`text-white px-4 py-2 rounded ${
                isSalesCompleted ? 'bg-gray-400' : 'bg-[#8F5BBD]'
              }`}
              disabled={isSalesCompleted}
            >
              전송
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};
