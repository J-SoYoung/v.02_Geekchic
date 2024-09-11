export const Skeleton = () => {
  return (
    <div className='animate-pulse'>
      <div>
        {/* 이미지 섹션 */}
        <div className='h-96 bg-gray-300 rounded'></div>
        <div className='p-8 pb-0 flex space-x-2'>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className='w-24 h-24 bg-gray-300 rounded'></div>
          ))}
        </div>
      </div>
      <div className='flex justify-between p-8 border-b'>
        <div className='h-8 bg-gray-300 rounded w-3/5 '></div>
        <div className='h-8 bg-gray-300 rounded w-1/5 '></div>
      </div>

      {/* 제목 및 가격 섹션 */}
      <div className='p-8 '>
        <div className='border-b pb-8'>
          <div className='h-6 bg-gray-300 rounded w-3/5'></div>
          <div className='mt-2 h-6 bg-gray-300 rounded w-2/5'></div>
          <div className='mt-2 h-6 bg-gray-300 rounded w-2/5'></div>
        </div>

        {/* 설명 섹션 */}
        <div className='py-8 space-y-4'>
          <div className='h-6 bg-gray-300 rounded'></div>
          <div className='h-6 bg-gray-300 rounded '></div>
          <div className='h-6 bg-gray-300 rounded '></div>
        </div>

        {/* 댓글 섹션 */}
        <div className='mt-8 space-y-4'>
          {[1, 2].map((_, index) => (
            <div key={index} className='flex space-x-4 items-center'>
              <div className='w-20 h-20 bg-gray-300 rounded-full'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-6 bg-gray-300 rounded w-1/3'></div>
                <div className='h-6 bg-gray-300 rounded'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
