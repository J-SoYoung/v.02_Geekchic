import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { ProductType } from '@/_typesBundle';
import { uploadCloudImagesArray, uploadProducts } from '@/_apis';
import { utcToKoreaTimes, validateProductData } from '@/_utils';

export const useProductUpload = (
  products: ProductType,
  uploadImages: File[],
) => {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
  return { isLoading, onClickUploadProducts };
};
