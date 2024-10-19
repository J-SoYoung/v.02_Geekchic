import { memo } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}
const ProductImageGallery = ({
  images,
  productName,
}: ProductImageGalleryProps) => {
  return (
    <section className='w-full h-[100%]'>
      <div className='mb-6 bg-gray-200 border-red-400'>
        <img
          src={images[0]}
          alt={productName}
          className='w-[100%] h-96 object-cover'
        />
      </div>
      <div className='flex space-x-4 pl-8'>
        {images.map((i, idx) => (
          <div key={idx} className='w-24 h-24 flex items-center justify-center'>
            <img src={i} className='w-full h-full object-cover' />
          </div>
        ))}
      </div>
    </section>
  );
};
export default memo(ProductImageGallery);
