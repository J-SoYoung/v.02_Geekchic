import { memo } from 'react';

interface SizeSelectorProps {
  sizeOptions: string[] | undefined;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}
const SizeSelector = ({
  sizeOptions,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  return (
    <div className='w-3/4 mb-8'>
      <label
        htmlFor='sizeSelect'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        사이즈 선택
      </label>
      <select
        id='sizeSelect'
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className='block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 text-m rounded-lg '
      >
        <option value=''>사이즈를 선택하세요</option>
        {sizeOptions &&
          sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
      </select>
    </div>
  );
};
export default memo(SizeSelector);
