import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addUsedComment, addUsedCommentProps } from '@/_apis';
import { userState } from '@/_recoil';
import { CommentType } from '@/_typesBundle';
import { utcToKoreaTimes, validateUsedComment } from '@/_utils';

export const CommentInput = () => {
  const { productId } = useParams<{ productId: string }>();
  const user = useRecoilValue(userState);
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async ({ productId, comment }: addUsedCommentProps) => {
      await addUsedComment({ productId, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['usedComments', productId],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });

  const onClickAddComment = () => {
    if (!validateUsedComment(newComment)) return;

    const newCommentData: CommentType = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      comment: newComment,
      createdAt: utcToKoreaTimes(),
    };
    addCommentMutation.mutate({
      productId: productId as string,
      comment: newCommentData,
    });
    setNewComment('');
  };

  return (
    <section className='w-[535px] h-[120px] mb-10 fixed bottom-0 bg-white'>
      <div className='flex mt-4 h-[50px]'>
        <input
          type='text'
          className='h-[100%] flex-1 px-4 border rounded-l-md outline-none'
          placeholder='댓글을 입력하세요'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          onClick={onClickAddComment}
          className='px-4 py-2 bg-[#8F5BBD] text-white rounded-r-md'
        >
          댓글 추가
        </button>
      </div>
    </section>
  );
};
