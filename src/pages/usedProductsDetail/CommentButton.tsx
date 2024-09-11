interface CommentButtonProps {
  onClick: () => void;
  text: string;
}
export const CommentButton = ({ onClick, text }: CommentButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='w-[60px] ml-2 px-2 py-1 bg-gray-200 rounded-md'
    >
      {text}
    </button>
  );
};