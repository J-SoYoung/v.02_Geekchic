import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='p-4 animate-pulse'>
      <div className='h-48 bg-gray-300 rounded'></div>
      <div className='mt-4 h-6 bg-gray-300 rounded'></div>
      <div className='mt-2 h-6 bg-gray-300 rounded w-1/2'></div>
    </div>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div className='grid grid-cols-2 pt-4'>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonCard key={item} />
      ))}
    </div>
  );
};

export default Skeleton;
