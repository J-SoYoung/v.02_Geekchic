import { useRef } from 'react';

interface UploadImageProps {
  previewImages: string[];
  setPreviewImages: (images: string[]) => void;
  setUploadImages: (files: File[]) => void;
}

export const UploadImage = ({
  previewImages,
  setPreviewImages,
  setUploadImages,
}: UploadImageProps) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const urlFile = URL.createObjectURL(file);
      setPreviewImages((prevImages) => prevImages.concat(urlFile));
      setUploadImages((prevImages) => prevImages.concat(file));
    }
  };

  return (
    <div className='mb-8'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        사진 등록 ( 2장 이상 올려주세요 )
      </label>
      <div className='flex space-x-2'>
        <input
          type='file'
          className='mb-4 hidden'
          multiple
          onChange={onChangeImage}
          ref={inputFileRef}
        />
        <div
          onClick={() => inputFileRef.current?.click()}
          className='w-20 h-20 bg-gray-300 flex items-center justify-center text-2xl text-gray-500 cursor-pointer'
        >
          +
        </div>
        {previewImages.map((image, index) => (
          <div
            key={index}
            className='w-20 h-20 bg-gray-200 relative flex items-center justify-center'
          >
            <img
              src={image}
              alt={`uploaded ${index}`}
              className='object-cover w-full h-full'
            />
            <button
              // onClick={() => removeImage(index)}
              className='w-10 h-10 absolute top-0 right-0 p-1 text-xs text-gray-500'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
