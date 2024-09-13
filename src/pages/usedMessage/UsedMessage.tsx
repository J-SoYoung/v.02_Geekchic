import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { Layout } from '@/components';
import { userState } from '@/_recoil';
import { sendMessages, getMessages } from '@/_apis';
import { MessagesInfoType } from '@/_typesBundle';

export const UsedMessage = () => {
  const queryClient = useQueryClient();
  const loginUser = useRecoilValue(userState);
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

  interface sendMessagesMutationTypt {
    currentMessages: MessagesInfoType;
    messageId: string;
  }
  const sendMessagesMutation = useMutation({
    mutationFn: async ({
      currentMessages,
      messageId,
    }: sendMessagesMutationTypt) => {
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
      timestamp: new Date().toISOString(),
    };
    sendMessagesMutation.mutate({
      currentMessages,
      messageId: messageId as string,
    });
  };

  // ⭕ 에러 컴포넌트, 로티이미지 추가 : 에러 페이지 데이터 새로고침 해주세요
  if (isError) {
    return (
      <div className='border h-40 p-2 text-center'>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <button
          className='cursor-pointer hover:font-bold'
          onClick={() => window.location.reload()}
        >
          GeekChic 메세지 가져오기 새로고침
        </button>
      </div>
    );
  }

  return (
    <Layout title={'쪽지 보내기'}>
      <div className='p-8 min-h-screen flex flex-col bg-gray-100'>
        {/* 판매자정보 */}
        <section className='border p-4 mb-8 flex bg-white'>
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
        </section>

        {/* messages */}
        <section className='w-full flex flex-col'>
          <div>
            {isPending ? (
              <p>로딩중 ⭕로딩 스켈레톤 적용</p>
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
                    <div>{message.content}</div>
                    <div className='text-xs'>
                      {message.timestamp.split('T')[0]}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* 대화 입력창 */}
        <section>
          <div className='w-[532px] flex items-center fixed bottom-24'>
            <textarea
              className='border w-full p-2 resize-none outline-0'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='메시지를 입력하세요'
              // disabled={isSalesCompleted}
            />
            <button
              className='text-white px-4 py-2 rounded bg-[#8F5BBD]'
              onClick={onClickSendMessage}
              // className={`text-white px-4 py-2 rounded ${
              //   isSalesCompleted ? 'bg-gray-400' : 'bg-[#8F5BBD]'
              // }`}
              // disabled={isSalesCompleted}
            >
              전송
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};
