interface RadioOption {
  label: string;
  value: string;
}
interface FormRadioProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormRadio = ({
  name,
  options,
  selectedValue,
  onChange,
}: FormRadioProps) => {
  return (
    <div className='flex space-x-4'>
      {options.map((option) => {
        return (
          <label key={option.value.toString()} className='flex items-center'>
            <input
              type='radio'
              name={name}
              value={option.value}
              onChange={onChange}
              className='form-radio'
              checked={selectedValue == option.value}
            />
            <span className='ml-1 mr-4'>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
