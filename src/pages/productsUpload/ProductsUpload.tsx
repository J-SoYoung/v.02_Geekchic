import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ProductType } from '@/_typesBundle';
import { FormInput, FormRadio, UploadImage } from '../usedProductsUpload';
import { BasicButton, Layout, LoadingSpinner } from '@/components';
import { initProduct } from '@/_example';
import { utcToKoreaTimes, validateProductData } from '@/_utils';
import { useMutation } from '@tanstack/react-query';
import { uploadCloudImagesArray, uploadProducts } from '@/_apis';

export const ProductsUpload = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductType>(initProduct);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClickMoveUsedMain = () => {
    if (confirm('제품 업로드를 취소하겠습니까?')) {
      setProducts(initProduct);
      navigate('/');
    }
  };

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target) {
      const { name, value } = e.target;
      setProducts({ ...products, [name]: value });
    }
  };

  const imageUploadMutation = useMutation({
    mutationFn: async (uploadImages: File[]) => {
      return uploadCloudImagesArray(uploadImages);
    },
  });

  const productUploadMutation = useMutation({
    mutationFn: async (newProducts: ProductType) => {
      await uploadProducts(newProducts);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.log('제품 업로드 에러', error);
      alert('업로드 중 에러가 발생했습니다.');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onClickUploadProducts = () => {
    setIsLoading(true);
    if (!validateProductData(products)) {
      setIsLoading(false);
      return alert('모든 필수 필드를 입력해주세요');
    }
    const id = uuidv4();
    const createdAt = utcToKoreaTimes();

    let newProducts: ProductType = {
      ...products,
      id,
      createdAt,
    };

    if (uploadImages) {
      imageUploadMutation.mutate(uploadImages, {
        onSuccess: (cloudImage) => {
          newProducts = { ...newProducts, images: cloudImage };
          productUploadMutation.mutate(newProducts);
        },
        onError: (error) => {
          console.log('이미지 업로드 에러', error);
          alert('이미지 업로드 중 에러가 발생했습니다. 다시 시도해주세요 ');
          setIsLoading(false);
        },
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-center'>
            <span className='mb-6 text-3xl text-[#8F5BBD] font-bold'>
              Loading
            </span>
            <LoadingSpinner size='6' />
          </div>
        </div>
      )}

      <Layout title='제품 등록' onClickFunc={onClickMoveUsedMain}>
        <div className='pb-36 text-left'>
          <UploadImage
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            setUploadImages={setUploadImages}
          />
          <FormInput
            label='상품명'
            type='text'
            name='productName'
            value={products.productName}
            onChange={onChangeInput}
            placeholder='상품명을 입력하세요'
          />
          {/* <FormInput
          label='카테고리'
          type='select'
          name='categories'
          value={products.categories}
          onChange={onChangeInput}
          placeholder='카테고리를 선택해주세요'
          options={[
            '카테고리를 선택해주세요',
            '아우터 | outer',
            '상의 | top',
            '하의 | bottom',
            '신발 | shoes',
            '악세사리 | acc',
          ]}
        /> */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2 '>
              카테고리
            </label>
            <FormRadio
              name='categories'
              options={[
                { label: '아우터', value: 'outer' },
                { label: '상의', value: 'top' },
                { label: '하의', value: 'bottom' },
                { label: '신발', value: 'shoes' },
                { label: '악세사리', value: 'acc' },
              ]}
              selectedValue={products.categories}
              onChange={onChangeInput}
            />
          </div>
          <FormInput
            label='사이즈'
            type='select'
            name='size'
            value={products.size}
            onChange={onChangeInput}
            placeholder='사이즈를 선택해주세요'
            options={[
              '사이즈를 선택해주세요',
              'S / M / L / XL',
              '66 / 77 / 88 / 99 / 100',
              '26 / 28 / 30 / 32 / 34',
              '220 / 230 / 240 / 250 / 260 / 270 / 280',
              'FREE ( 설명란에 자세히 써주세요 )',
            ]}
          />
          <FormInput
            label='가격'
            type='number'
            name='price'
            value={products.price}
            onChange={onChangeInput}
            placeholder='최소 가격은 1000원 입니다'
            min={1000}
            step={1000}
          />
          <FormInput
            label='수량'
            type='number'
            name='quantity'
            value={products.quantity}
            onChange={onChangeInput}
            placeholder='최소 수량은 5개 입니다'
            min={5}
          />
          <FormInput
            label='설명'
            type='textarea'
            name='description'
            value={products.description}
            onChange={onChangeInput}
            placeholder='상품의 자세한 설명을 입력해 주세요'
          />

          <BasicButton
            onClickFunc={onClickUploadProducts}
            text='등록하기'
            bg='bg-[#8F5BBD]'
          />
        </div>
      </Layout>
    </>
  );
};
