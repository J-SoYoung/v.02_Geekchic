import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Comment } from './Comment';

import { getUsedComment } from '@/_apis/apis';
import { CommentType } from '@/_typesBundle';

export const CommentsList = () => {
  const { productId } = useParams<string>();
  const {
    data: comments,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['usedComments', productId],
    queryFn: () => getUsedComment(productId as string),
  });

  if (isPending) return <p>로딩중... </p>;
  if (isError) return <p>댓글 불러오기 에러 새로고침... </p>;

  return (
    <section className='mb-20'>
      <div className='text-lg font-bold mb-4'>댓글 {comments.length}</div>
      {comments.map((comment: CommentType) => {
        return (
          <Comment
            key={comment.commentId}
            comment={comment}
            productId={productId as string}
          />
        );
      })}
    </section>
  );
};
