import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMessageList, removeMessage } from '@/_apis';
import { userState } from '@/_recoil';
import { ErrorPageReload, Layout, SellerMark } from '@/components';
import { MessageResultType } from '@/_typesBundle';

export const UsedMessageList = () => {
  const [user, setUser] = useRecoilState(userState);
  const listMessages = user.listMessages;
  const queryClient = useQueryClient();

  const {
    data: messagesList,
    isPending,
    isError,
  } = useQuery<MessageResultType[] | []>({
    queryKey: ['usedMessagesList'],
    queryFn: async () => await getMessageList(listMessages as string[]),
    retry: 3,
    retryDelay: 1000,
  });
  
  const removeMessageMutation = useMutation({
    mutationFn: async (messageId: string) =>
      removeMessage({ messageId, setUser, user }),
    onSuccess: (messageId) => {
      queryClient.invalidateQueries(
        {
          queryKey: ['usedMessageInfo', messageId],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });

  const onClickRemoveMessage = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('쪽지를 삭제하시겠습니까? 삭제된 쪽지는 살릴 수 없습니다')) {
      removeMessageMutation.mutate(messageId);
    }
  };

  if (isError) {
    return (
      <ErrorPageReload
        content='데이터를 가져오는 동안 문제가 발생했습니다'
        pageName={'쪽지함 리스트'}
      />
    );
  }

  return (
    <Layout title='내 쪽지함'>
      {isPending ? (
        <p>로딩중</p>
      ) : (
        <div className='text-left'>
          <div className='text-left'>
            <div className='text-m text-gray-600 mb-4 pb-4 border-b'>
              <span className='font-bold'>전체 {messagesList?.length}</span>
            </div>
            {messagesList.length === 0 ? (
              <div>
                <p>쪽지가 없습니다</p>
                <Link to={'/used'}>중고 제품을 둘러보세요</Link>
              </div>
            ) : (
              messagesList.map((message) => {
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
                  seller,
                } = message;
                return (
                  <Link
                    key={message.messageId}
                    to={`/message/send/${message.messageId}`}
                    state={{
                      buyerId,
                      createdAt,
                      messageId,
                      price,
                      productId,
                      productImage,
                      productName,
                      quantity,
                      sellerId,
                      sellerName: seller.username,
                    }}
                    className={`flex p-2 items-center hover:bg-[#eee]`}
                  >
                    <div className='w-1/5 h-24 relative mr-3'>
                      <img
                        src={message.productImage}
                        alt='icon'
                        className='w-24 h-24 rounded-full object-cover mr-2 '
                      />
                      <SellerMark sellerId={message?.seller._id} />
                    </div>
                    <div className='w-4/5 flex justify-between items-center '>
                      <div className='flex flex-col flex-1'>
                        <span className='mb-1 text-xl font-semibold'>
                          {message.productName}
                        </span>
                        <div className='flex flex-col text-m text-gray-500'>
                          <span className='mr-1'>
                            판매자 : {message.seller.username}
                          </span>
                          <span className='mr-1'>
                            구매자 : {message.seller.username}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className='text-s text-gray-400'>
                          {message.createdAt[0]}
                        </span>
                        {message?.salesStatus === 'completed' && (
                          <div className='text-center'>
                            <p className='mb-1 text-red-400 font-bold'>
                              판매완료
                            </p>
                            <button
                              onClick={(e) =>
                                onClickRemoveMessage(e, message.messageId)
                              }
                              className='border px-2 py-1 rounded-lg hover:bg-[#bc92e0]'
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
