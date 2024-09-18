import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { ContentsBox } from './index';

import { Layout, BasicButton, LoadingSpinner } from '@/components';
import { userState } from '@/_recoil';
import { UserDataType } from '@/_typesBundle';
import { uploadCloudImage, editUserProfileData } from '@/_apis';
import { Icon_Pencile } from '@/_assets';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// ⭕프로필 수정시 -> 전화번호. 주소 유효성검사 check
export const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useRecoilState(userState);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<UserDataType>(user);

  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const imageRef = useRef<HTMLInputElement>(null);

  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const { name, value } = e.target;
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const onChangeEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      const urlFile = URL.createObjectURL(file);
      setPreviewImage(urlFile);
    }
  };

  const onClickProfileCancel = () => {
    setEditUser(user);
    setIsEditing(false);
    setPreviewImage(user.avatar ?? '');
  };

  const saveProfileMutation = useMutation({
    mutationFn: async (updatedUser: UserDataType) => {
      await editUserProfileData(updatedUser, setUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ['user', user._id],
          refetchType: 'active',
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true },
      );
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const onClickSaveProfile = async () => {
    let updatedUser: UserDataType = { ...editUser };
    if (imageFile) {
      const cloudImage = await uploadCloudImage(imageFile);
      updatedUser = { ...editUser, avatar: cloudImage };
    }
    saveProfileMutation.mutate(updatedUser);
  };

  return (
    <Layout
      title='내 프로필 관리'
      onClickFunc={() => {
        navigate(-1);
      }}
    >
      <div className='p-8 relative'>
        {saveProfileMutation.isPending && (
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
            onChange={onChangeEditInput}
          />
          <ContentsBox
            title={'이름'}
            value={editUser.username ?? ''}
            isEditing={isEditing}
            inputName={'username'}
            onChange={onChangeEditInput}
          />
          <ContentsBox
            title={'전화번호'}
            value={editUser.phone ?? ''}
            isEditing={isEditing}
            inputName={'phone'}
            onChange={onChangeEditInput}
            isBlank={!user.phone}
          />
          <ContentsBox
            title={'주소'}
            value={editUser.address}
            isEditing={isEditing}
            inputName={'address'}
            onChange={onChangeEditInput}
            onKeyDown={(e: { key: string }) => {
              if (e.key === 'Enter') onClickSaveProfile();
            }}
            isBlank={!user.address}
          />
        </div>

        {isEditing ? (
          <div className='my-20 w-full flex justify-between'>
            <BasicButton
              onClickFunc={onClickSaveProfile}
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
