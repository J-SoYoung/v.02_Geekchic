import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMessageList, MessageResultType } from '@/_apis';
import { userState } from '@/_recoil';
import { Layout, SellerMark } from '@/components';

export const UsedMessageList = () => {
  const { listMessages } = useRecoilValue(userState);

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

  // ⭕에러 컴포넌트, 로티이미지
  if (isError)
    return (
      <div className='border h-80 py-20 text-center'>
        <div> 쪽지함 데이터를 가져오지 못했습니다. </div>
        <button
          className='cursor-pointer hover:font-bold'
          onClick={() => window.location.reload()}
        >
          GeekChic 중고 쪽지함 데이터 새로고침
        </button>
        {/* <Link to={`/my/${_id}`} className='hover:font-bold'>
          마이페이지로 돌아가기
        </Link> */}
      </div>
    );

  return (
    <Layout title='내 쪽지함'>
      {isPending ? (
        <p>로딩중</p>
      ) : (
        <div className='text-left'>
          <div className='p-10 text-left'>
            <div className='text-m text-gray-600 mb-4 pb-4 border-b'>
              <span className='font-bold'>전체 {messagesList?.length}</span>
            </div>
            {messagesList.length === 0 ? (
              <div>
                <p>쪽지가 없습니다</p>
                <Link to={'/usedHome'}>중고 제품을 둘러보세요</Link>
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
                  seller
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
                      sellerName : seller.username, 
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
                    <div className='w-4/5 flex justify-between items-start '>
                      <div className='flex flex-col flex-1'>
                        <div className='text-xl font-semibold'>
                          {message.productName}
                        </div>
                        <div className='text-m  text-gray-500 flex items-center'>
                          <span className='mr-1'>{message.seller.username}</span>

                          {/*{isCompleted && (
                            <p className='text-red-400 font-bold'>판매완료</p>
                          )} */}
                        </div>
                      </div>
                      <p className='text-s text-gray-400'>
                        {message.createdAt.split('T')[0]}
                      </p>
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
