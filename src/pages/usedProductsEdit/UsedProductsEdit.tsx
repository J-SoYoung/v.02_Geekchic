import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { BasicButton, Layout, LoadingSpinner } from '@/components';
import { FormInput, FormRadio } from '../usedProductsUpload';

import { editUsedProducts, getUsedPageMainInfo } from '@/_apis';
import { initlUsedProduct } from '@/_example';
import { UsedProductType } from '@/_typesBundle';
import { validateProductData } from '@/_utils';

export const UsedProductsEdit = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [usedEditProducts, setUsedEditProducts] =
    useState<UsedProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: usedProductData } = useQuery({
    queryKey: ['usedProductDetail', productId],
    queryFn: () =>
      getUsedPageMainInfo<UsedProductType>({
        table: 'usedProducts',
        id: productId as string,
      }),
  });

  useEffect(() => {
    if (usedProductData) {
      setUsedEditProducts(usedProductData);
    }
  }, [usedProductData]);

  const onClickMoveUsedMain = () => {
    if (confirm('중고 제품 수정을 취소하겠습니까?')) {
      setUsedEditProducts(initlUsedProduct);
      navigate(`/used/detail/${productId}`);
    }
  };

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target) {
      const { name, value } = e.target;
      setUsedEditProducts((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const editUsedProductMutation = useMutation({
    mutationFn: async (newUsedProducts: UsedProductType) => {
      await editUsedProducts(newUsedProducts);
    },
    onSuccess: () => {
      alert('수정완료');
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

  const onClickEditUsedProducts = async () => {
    setIsLoading(true);
    if (usedEditProducts !== null) {
      if (!validateProductData(usedEditProducts)) {
        setIsLoading(false);
        return alert('모든 필수 필드를 입력해주세요');
      }
      editUsedProductMutation.mutate(usedEditProducts);
    }
  };

  if (!usedEditProducts) return null;

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
      <Layout title='제품 수정' onClickFunc={onClickMoveUsedMain}>
        <div className='pb-36 text-left'>
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              사진은 수정이 불가합니다
            </label>
            <div className='flex space-x-2'>
              {usedEditProducts.images.map((image, index) => (
                <div
                  key={index}
                  className='w-20 h-20 bg-gray-200 relative flex items-center justify-center'
                >
                  <img
                    src={image}
                    alt={`uploaded ${index}`}
                    className='object-cover w-full h-full'
                  />
                </div>
              ))}
            </div>
          </div>

          <FormInput
            label='상품명'
            type='text'
            name='productName'
            value={usedEditProducts.productName}
            onChange={onChangeInput}
            placeholder='상품명을 입력하세요'
          />
          <FormInput
            label='가격'
            type='number'
            name='price'
            value={usedEditProducts.price}
            onChange={onChangeInput}
            placeholder='최소 가격은 1000원 입니다'
            min={1000}
            step={1000}
          />
          <FormInput
            label='수량'
            type='number'
            name='quantity'
            value={usedEditProducts.quantity}
            onChange={onChangeInput}
            placeholder='최소 수량은 1개 입니다'
            min={1}
          />
          <FormInput
            label='사이즈'
            type='select'
            name='size'
            value={usedEditProducts.size}
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
              selectedValue={usedEditProducts.deliveryCharge}
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
              selectedValue={usedEditProducts.conditions}
              onChange={onChangeInput}
            />
          </div>
          <FormInput
            label='설명'
            type='textarea'
            name='description'
            value={usedEditProducts.description}
            onChange={onChangeInput}
            placeholder='상품의 자세한 설명을 입력해 주세요'
          />
          <BasicButton
            onClickFunc={onClickEditUsedProducts}
            text='수정하기'
            bg='bg-[#8F5BBD]'
          />
        </div>
      </Layout>
    </>
  );
};
