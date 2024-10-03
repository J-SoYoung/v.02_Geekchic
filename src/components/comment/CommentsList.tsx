import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Comment } from './index';

import { getUsedPageSortData } from '@/_apis';
import { CommentType } from '@/_typesBundle';
import { ErrorPageReload } from '@/components';

export const CommentsList = ({
  url,
  queryKeys,
}: {
  url: string;
  queryKeys: string;
}) => {
  const { productId } = useParams<string>();

  const {
    data: comments,
    isPending,
    isError,
  } = useQuery<CommentType[]>({
    queryKey: [queryKeys, productId],
    queryFn: () => getUsedPageSortData<CommentType>({ url: `${url}` }),
  });

  if (isPending) return <p>로딩중... </p>;
  if (isError) {
    return (
      <ErrorPageReload
        content='댓글을 가져오는 동안 문제가 발생했습니다'
        pageName={'제품 상세 페이지'}
      />
    );
  }
  return (
    <section className='mb-40'>
      <div className='text-lg font-bold mb-4'>댓글 {comments.length}</div>
      {comments.map((comment: CommentType) => {
        return (
          <Comment
            key={comment.commentId}
            comment={comment}
            productId={productId as string}
            queryKeys={queryKeys}
            url={url}
          />
        );
      })}
    </section>
  );
};
