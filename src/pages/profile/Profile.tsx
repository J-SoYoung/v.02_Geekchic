import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { userState } from '@/_recoil/atoms';
import { UserDataType } from '@/_typesBundle/userType';
import { uploadCloudImage } from '@/_apis/uploader';
import { editUserProfileData } from '@/_apis/userApis';
import Icon_Pencile from '@assets/icons/pencil.svg';
import { ContentsBox } from './ContentsBox';
import { MyPageLayout } from '@components/MyPageLayout';
import { BasicButton } from '@/components/button/BasicButton';

// ⭕업로드 페이지에서 ContentsBox사용할 수 있지 않을까? think
// onChangeEditInput데이터가 여러개인 input의 경우 (업로드페이지)에서 적용하기
export const Profile = () => {
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

  const onClickSaveProfile = async () => {
    let updatedUser: UserDataType = { ...editUser };
    if (imageFile) {
      const cloudImage = await uploadCloudImage(imageFile);
      updatedUser = { ...editUser, avatar: cloudImage };
    }
    await editUserProfileData(updatedUser, setUser);
    setIsEditing(false);
  };

  return (
    <MyPageLayout title='내 프로필 관리'>
      <div className='p-8'>
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
    </MyPageLayout>
  );
};
