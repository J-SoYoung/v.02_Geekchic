import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { userState } from '@/_recoil/atoms';
import { UserDataType } from '@/_typesBundle/userType';
import { uploadCloudImage } from '@/_apis/uploader';
import { editUserProfileData } from '@/_apis/userApis';
import Icon_Pencile from '@assets/icons/pencil.svg';
import { ContentsBox } from './ContentsBox';

import { BasicButton } from '@/components/button/BasicButton';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

// ⭕프로필 수정하면 중고제품 판매자 정보도 같이 업로드 되게하기.
// ⭕프로필 수정시 -> 전화번호. 주소 유효성검사 check
// ⭕프로필 enter이벤트는 언제 감지하는 게 좋을까? 아... 상위에서 감지하게 하는거.
// ⭕프로필 업데이트도 mutaion으로 하기 -> 프로필 수정 로딩중 상태표시
export const Profile = () => {
  const navigate = useNavigate();
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
    <Layout
      title='내 프로필 관리'
      onClickFunc={() => {
        navigate(-1);
      }}
    >
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
