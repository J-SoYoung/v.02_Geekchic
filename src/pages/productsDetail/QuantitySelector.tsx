import { memo } from "react";

interface QuantitySelectorProps {
  quantity: number;
  selectedQuantity: number;
  setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>;
}
const QuantitySelector = ({
  quantity,
  selectedQuantity,
  setSelectedQuantity,
}: QuantitySelectorProps) => {
  return (
    <div className='w-3/4 mb-8'>
      <label
        htmlFor='sizeSelect'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        수량 선택
      </label>
      <input
        type='number'
        placeholder='수량을 선택해주세요'
        value={selectedQuantity}
        onChange={(e) => {
          setSelectedQuantity(Number(e.target.value));
        }}
        className='border block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 text-m rounded-lg '
        min={0}
        max={quantity}
      />
    </div>
  );
};

export default memo(QuantitySelector)