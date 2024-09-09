interface InfoPropsType {
  title: string;
  value: string;
  isBlank?: boolean;
  isEditing: boolean;
  inputName: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export const ContentsBox = ({
  title,
  value,
  isBlank = false,
  isEditing,
  inputName,
  onChange,
  onKeyDown,
}: InfoPropsType) => {
  return (
    <div className={`pt-5 ${isEditing ? '' : 'border-b'}`}>
      <span className='block text-sm text-gray-500'>{title}</span>
      {isEditing ? (
        <input
          type='text'
          name={inputName}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={inputName === 'email'}
          className='block text-lg p-2 w-full border rounded'
        />
      ) : (
        <span className={`block text-lg p-2 ${isBlank && 'text-gray-500'}`}>
          {isBlank ? `${inputName}을 입력해주세요` : value}
        </span>
      )}
    </div>
  );
};
