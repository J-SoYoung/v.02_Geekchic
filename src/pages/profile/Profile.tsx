import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ContentsBox } from './index';

import { Layout, BasicButton, LoadingSpinner } from '@/components';
import { userState } from '@/_recoil';
import { UserDataType } from '@/_typesBundle';
import { Icon_Pencile } from '@/_assets';
import { useInput } from '@/hooks/useInput';
import { useImage } from './useImage';
import { useProfileMutation } from './useProfileMutation';

export const Profile = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: '',
    phone: '',
    address: '',
  });
  const imageRef = useRef<HTMLInputElement>(null);

  const {
    values: editUser,
    handleChange,
    reset,
  } = useInput<UserDataType>(user);
  const { previewImage, imageFile, onChangeEditImage, resetImage } = useImage();

  const onClickProfileCancel = () => {
    reset();
    setIsEditing(false);
    resetImage();
    setErrorMessage({ username: '', phone: '', address: '' });
  };

  const { onClickSaveProfile, isLoadingProfile } = useProfileMutation({
    imageFile,
    setIsEditing,
    editUser,
  });

  const onClickProfileValidate = () => {
    const newErrorMessage = { ...errorMessage };

    if (!/^[a-zA-Z가-힣\s]{2,20}$/.test(editUser.username)) {
      newErrorMessage.username = '올바른 이름을 입력해주세요.';
    } else {
      newErrorMessage.username = '';
    }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(editUser.phone)) {
      newErrorMessage.phone = '유효한 전화번호를 입력해주세요.';
    } else {
      newErrorMessage.phone = '';
    }
    if (editUser.address.length < 5) {
      newErrorMessage.address = '주소를 정확히 입력해주세요.';
    } else {
      newErrorMessage.address = '';
    }
    setErrorMessage(newErrorMessage);

    // 모두 빈칸이 아니다. 
    const hasError = Object.values(newErrorMessage).some(
      (message) => message !== '',
    );
    // 모두 빈칸이다. ( 부정부정)
    if (!hasError) {
      onClickSaveProfile();
    }
  };

  return (
    <Layout
      title='내 프로필 관리'
      onClickFunc={() => {
        navigate(-1);
      }}
    >
      <div className='p-8 relative'>
        {isLoadingProfile && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <LoadingSpinner size='8' />
          </div>
        )}
        <div>
          <div className='w-24 h-24 bg-gray-200 rounded-full mx-auto mb-10 relative border'>
            <img
              src={previewImage ? previewImage : user.avatar}
              alt='Profile'
              className='w-full h-full object-cover rounded-full'
            />
            {isEditing && (
              <>
                <input
                  type='file'
                  multiple
                  onChange={onChangeEditImage}
                  className='mb-4 hidden'
                  ref={imageRef}
                />
                <button className='absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer'>
                  <img
                    src={Icon_Pencile}
                    alt='profile_img_edit'
                    onClick={() => imageRef.current?.click()}
                  />
                </button>
              </>
            )}
          </div>
        </div>

        <div className='text-left'>
          <ContentsBox
            title={'이메일'}
            value={editUser.email ?? ''}
            isEditing={isEditing}
            inputName={'email'}
            onChange={handleChange}
          />
          <ContentsBox
            title={'이름'}
            value={editUser.username ?? ''}
            isEditing={isEditing}
            inputName={'username'}
            onChange={handleChange}
          />
          {errorMessage.username && (
            <p className='text-red-500'>{errorMessage.username}</p>
          )}
          <ContentsBox
            title={'전화번호 ( - 까지 입력해주세요)'}
            value={editUser.phone ?? ''}
            isEditing={isEditing}
            inputName={'phone'}
            onChange={handleChange}
            isBlank={!user.phone}
          />
          {errorMessage.phone && (
            <p className='text-red-500'>{errorMessage.phone}</p>
          )}
          <ContentsBox
            title={'주소'}
            value={editUser.address}
            isEditing={isEditing}
            inputName={'address'}
            onChange={handleChange}
            onKeyDown={(e: { key: string }) => {
              if (e.key === 'Enter') onClickProfileValidate();
            }}
            isBlank={!user.address}
          />
          {errorMessage.address && (
            <p className='text-red-500'>{errorMessage.address}</p>
          )}
        </div>

        {isEditing ? (
          <div className='my-20 w-full flex justify-between'>
            <BasicButton
              onClickFunc={onClickProfileValidate}
              text='저장하기'
              bg='bg-[#8F5BBD]'
            />
            <BasicButton
              onClickFunc={onClickProfileCancel}
              text='취소하기'
              bg='bg-[#adb5bd]' //#868e96
            />
          </div>
        ) : (
          <div className='my-20'>
            <BasicButton
              onClickFunc={() => setIsEditing(true)}
              text='수정하기'
              bg='bg-[#8F5BBD]'
            />
          </div>
        )}
      </div>
    </Layout>
  );
};
