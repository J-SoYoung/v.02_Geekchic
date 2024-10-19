export const SkeletonProduct = () => {
  return (
    <div className='grid grid-cols-4 gap-4 mt-4 mb-24 animate-pulse'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <div className='w-full h-40 bg-gray-300 rounded-md'></div>
        </div>
      ))}
    </div>
  );
};
