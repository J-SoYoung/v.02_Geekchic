interface FormInputProps {
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'radio';
  name: string;
  value: string | number | boolean;
  options?: string[]; // select나 radio에 대한 옵션
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  placeholder?: string;
  min?: number;
  step?: number;
}

export const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  options = [],
  placeholder = '',
  min = 0,
  step = 0,
}: FormInputProps) => {
  return (
    <div className='mb-8'>
      <label className='mb-1 block text-sm font-medium text-gray-700'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          className='h-[200px] w-full mt-1 block resize-none border border-gray-300 rounded-md p-4 focus:outline-none'
          placeholder={placeholder}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value as string}
          onChange={onChange}
          className='border p-2'
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          className='w-full p-2 block text-lg border rounded shadow-sm'
          placeholder={placeholder}
          min={min}
          step={step}
        />
      )}
    </div>
  );
};
