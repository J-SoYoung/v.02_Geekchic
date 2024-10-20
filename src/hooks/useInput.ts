import { useState, ChangeEvent } from 'react';

interface UseInputReturn<T> {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
}

export const useInput = <T extends Record<string, any>>(initialState: T): UseInputReturn<T> => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialState);

  return { values, handleChange, setValues, reset };
};
