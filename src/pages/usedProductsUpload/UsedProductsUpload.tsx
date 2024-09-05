import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { uploadCloudImagesArray } from '@/_apis/uploader';
import { uploadUsedProducts } from '@/_apis/apis';
import { UsedProductsType } from '@/_typesBundle/productType';
import { userState } from '@/_recoil/atoms';
import { initlUsedProduct } from '@/_example/example';
import Chevron_left from '@/_assets/icons/chevron_left.svg';

// ⭕ Layout 공용컴포넌트 만들기 ( 지금은따로씀 <header> ) = 추상화하기
// input 컴포넌트 만들기
// 이미지컴포넌트 따로 만들기
// 로딩스피터 생성하기 -> 지금은 문구로 되어있음
export const UsedProductsUpload = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [usedProducts, setUsedProducts] =
    useState<UsedProductsType>(initlUsedProduct);
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

  const inputFileRef = useRef<HTMLInputElement>(null);
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const urlFile = URL.createObjectURL(file);
      setPreviewImages((prevImages) => prevImages.concat(urlFile));
      setUploadImages((prevImages) => prevImages.concat(file));
      setUsedProducts({ ...usedProducts, images: previewImages });
    }
  };
  const onClickMoveUsedMain = () => {
    if (confirm('중고 제품 업로드를 취소하겠습니까?')) {
      setUsedProducts(initlUsedProduct);
      navigate('/used');
    }
  };
  console.log(usedProducts);

  type ValidateProductInputType = Omit<
    UsedProductsType,
    'id' | 'seller' | 'createdAt' | 'isSales' | 'deliveryCharge'
  >;
  const validateProductData = (usedProducts: ValidateProductInputType) => {
    console.log(usedProducts);
    if (
      !usedProducts.description ||
      !usedProducts.productName ||
      !usedProducts.conditions ||
      !usedProducts.price ||
      !usedProducts.quantity ||
      !usedProducts.size
    ) {
      return false;
    }
    if (usedProducts.images.length === 0) return false;
    return true;
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

      let newUsedProducts: UsedProductsType = {
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
      <header className='p-8 text-left relative '>
        {isLoading && (
          <div className='fixed top-80 left-[40%] text-3xl text-red-500'>
            Loading ...
          </div>
        )}

        <img
          src={Chevron_left}
          alt='이전 페이지로'
          className='w-10 h-10 cursor-pointer'
          onClick={onClickMoveUsedMain}
        />
        <h1 className='text-3xl font-bold text-center mb-5 mt-5'>제품 등록</h1>
      </header>

      <div className='pb-36 p-8 text-left'>
        {/* 사진등록 */}
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
                  className='absolute top-0 right-0 p-1 text-xs text-gray-500'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* input type등록 */}
        <div>
          <div className='mb-8'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              상품명
            </label>
            <input
              type='text'
              name='productName'
              value={usedProducts.productName}
              onChange={onChangeInput}
              className='w-full p-2 block text-lg border rounded shadow-sm '
              placeholder='상품명을 입력하세요'
            />
          </div>
          <div className='mb-8'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              가격
            </label>
            <input
              type='number'
              name='price'
              value={usedProducts.price}
              onChange={onChangeInput}
              min={1000}
              className='w-full p-2 block text-lg border rounded shadow-sm '
              placeholder='가격을 입력하세요'
            />
          </div>
          <div className='mb-8'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              수량
            </label>
            <input
              type='number'
              name='quantity'
              value={usedProducts.quantity}
              onChange={onChangeInput}
              min={1}
              className='w-full p-2 block text-lg border rounded shadow-sm '
              placeholder='최소 수량은 1개 입니다'
            />
          </div>
          <div className='mb-8'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              사이즈
            </label>
            <select name='size' onChange={onChangeInput} className='border p-2'>
              <option value=''>사이즈를 선택해주세요</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
              <option value='FREE'>FREE</option>
            </select>
          </div>
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
          <div className='mb-8 h-[200px]'>
            <label className='block text-sm font-medium text-gray-700'>
              설명
            </label>
            <textarea
              className='mt-1 block min-h-[150px] w-full resize-none border border-gray-300 rounded-md p-4 focus:outline-none'
              placeholder='상품의 자세한 설명을 입력해 주세요'
              name='description'
              value={usedProducts.description}
              onChange={onChangeInput}
            />
          </div>

          <button
            onClick={onClickUploadUsedProducts}
            className='w-full h-[45px] py-2 px-4 bg-[#8F5BBD] text-white rounded-md'
          >
            등록하기
          </button>
        </div>
      </div>
    </>
  );
};
