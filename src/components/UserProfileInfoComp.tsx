interface UserInofCompProps {
  avatar: string;
  username: string;
  address: string;
}

export const UserProfileInfoComp = ({
  avatar,
  username,
  address,
}: UserInofCompProps) => {
  return (
    <div className='flex'>
      <div className='w-12 h-12 bg-gray-200 rounded-full'>
        <img
          src={avatar}
          alt='유저'
          className='w-full h-full object-cover rounded-full border'
        />
      </div>
      <div className='ml-4'>
        <p className='text-lg font-semibold'>{username}</p>
        <p className='text-sm text-gray-500'>{address}</p>
      </div>
    </div>
  );
};
