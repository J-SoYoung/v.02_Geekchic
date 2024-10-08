import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentButton } from './CommentButton';

import { userState } from '@/_recoil';
import { CommentType } from '@/_typesBundle';
import { editComments, removeComment } from '@/_apis';
import { validateComment } from '@/_utils';

interface CommentProps {
  comment: CommentType;
  productId: string;
  queryKeys: string;
  url: string;
}
interface EditCommentProps {
  productId: string;
  commentId: string;
  editCommentData: CommentType;
}

export const Comment = ({
  comment,
  productId,
  url,
  queryKeys,
}: CommentProps) => {
  const user = useRecoilValue(userState);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [editComment, setEditComment] = useState('');

  const queryClient = useQueryClient();

  const editCommentMutation = useMutation({
    mutationFn: async ({ commentId, editCommentData }: EditCommentProps) => {
      await editComments({ url: `${url}/${commentId}`, editCommentData });
    },
    onSuccess: () => {
      setIsCommentEdit(false);
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
  const onClickEditComment = (commentId: string) => {
    if (!validateComment(editComment)) return;

    const editCommentData = {
      ...comment,
      comment: editComment,
    };
    editCommentMutation.mutate({
      productId: productId as string,
      commentId,
      editCommentData,
    });
  };

  const removeCommentMutation = useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      await removeComment(`${url}/${commentId}`);
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
  const onClickRemoveComment = (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      removeCommentMutation.mutate({ commentId });
    }
  };

  return (
    <div className='flex border-b py-6'>
      <img
        src={comment.avatar}
        alt={comment.username}
        className='w-[60px] h-[60px]  mr-4 object-cover rounded-full border'
      />
      <div className='w-full'>
        <div className='flex mb-2 items-end justify-between'>
          <div className='flex'>
            <div className='font-semibold'>{comment.username}</div>
            {user._id === comment.userId &&
              (isCommentEdit ? (
                <>
                  <CommentButton
                    onClick={() =>
                      onClickEditComment(comment.commentId as string)
                    }
                    text={'저장'}
                  />
                  <CommentButton
                    onClick={() => setIsCommentEdit(false)}
                    text={'취소'}
                  />
                </>
              ) : (
                <>
                  <CommentButton
                    onClick={() => setIsCommentEdit(true)}
                    text={'수정'}
                  />
                  <CommentButton
                    onClick={() =>
                      onClickRemoveComment(comment.commentId as string)
                    }
                    text={'삭제'}
                  />
                </>
              ))}
          </div>
          <div className='text-sm text-gray-500'>{comment.createdAt[0]}</div>
        </div>

        {isCommentEdit ? (
          <>
            <input
              type='text'
              defaultValue={comment.comment}
              onChange={(e) => {
                setEditComment(e.target.value);
              }}
              className='w-full p-2 border outline-none '
            />
          </>
        ) : (
          <div className='text-gray-800'>{comment.comment}</div>
        )}
      </div>
    </div>
  );
};
