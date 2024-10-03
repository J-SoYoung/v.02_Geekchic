import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/_apis';
import { userState } from '@/_recoil';
import { CommentType } from '@/_typesBundle';
import { utcToKoreaTimes, validateComment } from '@/_utils';

export const CommentInput = ({ url, queryKeys }: { url: string; queryKeys: string }) => {
  const { productId } = useParams<{ productId: string }>();
  const user = useRecoilValue(userState);
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async ({ comment }: { comment: CommentType }) => {
      await addComment({ url, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [queryKeys, productId],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
  });

  const onClickAddComment = () => {
    if (!validateComment(newComment)) return;

    const newCommentData: CommentType = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      comment: newComment,
      createdAt: utcToKoreaTimes(),
    };
    addCommentMutation.mutate({ comment: newCommentData });
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
