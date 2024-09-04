import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { userState } from '@recoil/atoms';
import { UserDataType } from '@typesBundle/userType';
import { uploadCloudImage } from '@/apis/uploader';
import { editUserProfileData } from '@/apis/userApis';
import Icon_Pencile from '@assets/icons/pencil.svg';
import { ContentsBox } from './ContentsBox';
import { MyPageLayout } from '@components/MyPageLayout';

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

  const onClickProfileSave = async () => {
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
            <button
              onClick={onClickProfileSave}
              className='w-full py-3 mr-2 bg-[#8F5BBD] rounded-lg text-white hover:bg-[#7b49a7]'
            >
              저장하기
            </button>
            <button
              onClick={onClickProfileCancel}
              className='w-full py-3 bg-[#524f4f] text-white rounded-lg hover:bg-[#524f4f]'
            >
              취소하기
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className='my-20 w-full py-3 bg-[#8F5BBD] text-white rounded-lg hover:bg-[#7b49a7]'
          >
            수정하기
          </button>
        )}
      </div>
    </MyPageLayout>
  );
};
