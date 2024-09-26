import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { UploadImage, FormInput } from './index';

import {
  Layout,
  BasicButton,
  ErrorPageReload,
  LoadingSpinner,
} from '@/components';
import { uploadCloudImagesArray, uploadUsedProducts } from '@/_apis';
import { UsedProductType } from '@/_typesBundle';
import { userState } from '@/_recoil';
import { initUsedProduct } from '@/_example';
import { utcToKoreaTimes, validateUsedProductData } from '@/_utils';
import { FormRadio } from './FormRadio';

export const UsedProductsUpload = () => {
  const navigate = useNavigate();;
  const [user, setUser] = useRecoilState(userState)

  const [usedProducts, setUsedProducts] =
    useState<UsedProductType>(initUsedProduct);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target) {
      const { name, value } = e.target;
      setUsedProducts({ ...usedProducts, [name]: value });
    }
  };

  const onClickMoveUsedMain = () => {
    if (confirm('중고 제품 업로드를 취소하겠습니까?')) {
      setUsedProducts(initUsedProduct);
      navigate('/used');
    }
  };

  const imageUploadMutation = useMutation({
    mutationFn: async (uploadImages: File[]) => {
      return uploadCloudImagesArray(uploadImages);
    },
  });

  const usedProductUploadMutation = useMutation({
    mutationFn: async (newUsedProducts: UsedProductType) => {
      await uploadUsedProducts(newUsedProducts, user, setUser );
    },
    onSuccess: () => {
      navigate('/used');
    },
    onError: (error) => {
      console.log('중고 제품 업로드 에러', error);
      alert('업로드 중 에러가 발생했습니다.');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onClickUploadUsedProducts = async () => {
    setIsLoading(true);

    if (!validateUsedProductData(usedProducts)) {
      setIsLoading(false);
      return alert('모든 필수 필드를 입력해주세요');
    }

    const {
      listCarts,
      listMessages,
      listPurchases,
      listSells,
      ...filteredUserData
    } = user;

    const id = uuidv4();
    const createdAt = utcToKoreaTimes();
    const seller = { ...filteredUserData };

    let newUsedProducts: UsedProductType = {
      ...usedProducts,
      id,
      createdAt,
      seller,
    };

    if (uploadImages) {
      imageUploadMutation.mutate(uploadImages, {
        onSuccess: (cloudImage) => {
          newUsedProducts = { ...newUsedProducts, images: cloudImage };
          usedProductUploadMutation.mutate(newUsedProducts);
        },
        onError: (error) => {
          console.log('이미지 업로드 에러', error);
          alert('이미지 업로드 중 에러가 발생했습니다. 다시 시도해주세요 ');
          setIsLoading(false);
        },
      });
    }
  };

  if (usedProductUploadMutation.isError) {
    return (
      <ErrorPageReload
        content={
          <p>
            데이터를 업로드 하는 동안 문제가 발생했습니다.
            <br /> 제품을 다시 업로드 해주세요
          </p>
        }
        pageName={'업로드'}
      />
    );
  }

  return (
    <>
      {isLoading && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-center'>
            <span className='mb-6 text-3xl text-[#8F5BBD] font-bold'>
              Loading
            </span>
            <LoadingSpinner size='6'/>
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
            placeholder='최소 가격은 1000원 입니다'
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
            options={[
              '사이즈를 선택해주세요',
              'S',
              'M',
              'L',
              'XL',
              'FREE ( 설명란에 자세히 써주세요 )',
            ]}
          />
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              배송비
            </label>
            <FormRadio
              name='deliveryCharge'
              options={[
                { label: '배송비 포함', value: 'include' },
                { label: '배송비 비포함', value: 'notInclude' },
              ]}
              selectedValue={usedProducts.deliveryCharge}
              onChange={onChangeInput}
            />
          </div>
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              물품 상태
            </label>
            <FormRadio
              name='conditions'
              options={[
                { label: '새상품', value: 'new' },
                { label: '중고상품', value: 'used' },
              ]}
              selectedValue={usedProducts.conditions}
              onChange={onChangeInput}
            />
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
