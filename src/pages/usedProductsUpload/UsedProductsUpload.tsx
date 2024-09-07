import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { UploadImage } from './UploadImage';
import { FormInput } from './FormInput';
import { validateProductData } from './utils';

import { uploadCloudImagesArray } from '@/_apis/uploader';
import { uploadUsedProducts } from '@/_apis/apis';
import { UsedProductType } from '@/_typesBundle/productType';
import { userState } from '@/_recoil/atoms';
import { initlUsedProduct } from '@/_example/example';
import { BasicButton } from '@/components/button/BasicButton';
import { Layout } from '@/components/Layout';

export const UsedProductsUpload = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [usedProducts, setUsedProducts] =
    useState<UsedProductType>(initlUsedProduct);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target) {
      const { name, value, type } = e.target;
      if (type === 'radio' && name === 'deliveryCharge') {
        const booleanValue = value === 'true';
        setUsedProducts({ ...usedProducts, [name]: booleanValue });
      } else {
        setUsedProducts({ ...usedProducts, [name]: value });
      }
    }
  };

  const onClickMoveUsedMain = () => {
    if (confirm('중고 제품 업로드를 취소하겠습니까?')) {
      setUsedProducts(initlUsedProduct);
      navigate('/used');
    }
  };

  const onClickUploadUsedProducts = async () => {
    setIsLoading(true);

    if (!validateProductData(usedProducts)) {
      setIsLoading(false);
      return alert('모든 필수 필드를 입력해주세요');
    }

    try {
      const id = uuidv4();
      const createdAt = new Date().toISOString();
      const seller = { ...user };

      let newUsedProducts: UsedProductType = {
        ...usedProducts,
        id,
        createdAt,
        seller,
      };

      if (uploadImages) {
        const cloudImage = await uploadCloudImagesArray(uploadImages);
        newUsedProducts = { ...newUsedProducts, images: cloudImage };
        uploadUsedProducts(newUsedProducts);
        navigate('/used');
      }
    } catch (error) {
      console.log('중고 제품 업로드 에러', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className='fixed top-80 left-[40%] text-3xl text-red-500'>
          {/* ⭕로티이미지 - 제품 업로드 로딩 ( 로딩스피너 ) */}
          Loading ...
        </div>
      )}
      <Layout title='제품 등록' onClickFunc={onClickMoveUsedMain}>
        <div className='pb-36 p-8 text-left'>
          <UploadImage
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            setUploadImages={setUploadImages}
          />
          <FormInput
            label='상품명'
            type='text'
            name='productName'
            value={usedProducts.productName}
            onChange={onChangeInput}
            placeholder='상품명을 입력하세요'
          />
          <FormInput
            label='가격'
            type='number'
            name='price'
            value={usedProducts.price}
            onChange={onChangeInput}
            placeholder='가격을 입력하세요'
            min={1000}
            step={1000}
          />
          <FormInput
            label='수량'
            type='number'
            name='quantity'
            value={usedProducts.quantity}
            onChange={onChangeInput}
            placeholder='최소 수량은 1개 입니다'
            min={1}
          />
          <FormInput
            label='사이즈'
            type='select'
            name='size'
            value={usedProducts.size}
            onChange={onChangeInput}
            placeholder='사이즈를 선택해주세요'
            options={['사이즈를 선택해주세요', 'S', 'M', 'L', 'XL', 'FREE']}
          />
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              배송비
            </label>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='deliveryCharge'
                  value='true'
                  onChange={onChangeInput}
                  className='form-radio'
                  checked={usedProducts.deliveryCharge === true}
                />
                <span className='ml-2'>배송비 포함</span>
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='deliveryCharge'
                  value='false'
                  onChange={onChangeInput}
                  className='form-radio'
                  checked={usedProducts.deliveryCharge === false}
                />
                <span className='ml-2'>배송비 비포함</span>
              </label>
            </div>
          </div>
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              물품 상태
            </label>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='conditions'
                  value='new'
                  onChange={onChangeInput}
                  className='form-radio'
                  checked={usedProducts.conditions === 'new'}
                />
                <span className='ml-2'>새상품</span>
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='conditions'
                  value='used'
                  onChange={onChangeInput}
                  className='form-radio'
                  checked={usedProducts.conditions === 'used'}
                />
                <span className='ml-2'>중고상품</span>
              </label>
            </div>
          </div>
          <FormInput
            label='설명'
            type='textarea'
            name='description'
            value={usedProducts.description}
            onChange={onChangeInput}
            placeholder='상품의 자세한 설명을 입력해 주세요'
          />
          <BasicButton
            onClickFunc={onClickUploadUsedProducts}
            text='등록하기'
            bg='bg-[#8F5BBD]'
          />
        </div>
      </Layout>
    </>
  );
};
