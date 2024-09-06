interface BasicButtonProps {
  onClickFunc: () => void;
  text: string;
  bg: string;
  width?: string;
}

export const BasicButton = ({
  onClickFunc,
  text,
  bg,
  width,
}: BasicButtonProps) => {
  return (
    <button
      onClick={onClickFunc}
      className={`${!width? 'w-full': `w-[${width}]`} h-[50px] mb-2 border rounded-md text-white ${bg}`}
    >
      {text}
    </button>
  );
};
