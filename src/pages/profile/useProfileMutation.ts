import { editUserProfileData, uploadCloudImage } from '@/_apis';
import { userState } from '@/_recoil';
import { UserDataType } from '@/_typesBundle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

interface useProfileMutationProps {
  imageFile: File | undefined;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editUser: UserDataType;
}
export const useProfileMutation = ({
  imageFile,
  setIsEditing,
  editUser,
}: useProfileMutationProps) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useRecoilState(userState);

  const onClickSaveProfile = async () => {
    let updatedUser: UserDataType = { ...editUser };
    if (imageFile) {
      const cloudImage = await uploadCloudImage(imageFile);
      updatedUser = { ...editUser, avatar: cloudImage };
    }
    saveProfileMutation.mutate(updatedUser);
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

  return {
    onClickSaveProfile,
    isLoadingProfile: saveProfileMutation.isPending,
  };
};
