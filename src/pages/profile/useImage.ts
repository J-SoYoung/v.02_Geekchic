import { useState } from 'react';

export const useImage = () => {
  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();

  const onChangeEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      const urlFile = URL.createObjectURL(file);
      setPreviewImage(urlFile);
    }
  };

  const resetImage = () => setPreviewImage('');
  return { previewImage, imageFile, onChangeEditImage, resetImage };
};
