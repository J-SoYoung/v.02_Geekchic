export const LoadingSpinner = ({ size }: { size: string }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex space-x-4'>
        <div
          className={`w-${size} h-${size} bg-purple-500 rounded-full animate-bounce`}
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className={`w-${size} h-${size} bg-yellow-500 rounded-full animate-bounce delay-200`}
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className={`w-${size} h-${size} bg-purple-500 rounded-full animate-bounce delay-400`}
          style={{ animationDelay: '0.4s' }}
        ></div>
        <div
          className={`w-${size} h-${size} bg-yellow-500 rounded-full animate-bounce delay-600`}
          style={{ animationDelay: '0.6s' }}
        ></div>
        <div
          className={`w-${size} h-${size} bg-purple-500 rounded-full animate-bounce delay-800`}
          style={{ animationDelay: '0.8s' }}
        ></div>
      </div>
    </div>
  );
};
// export const LoadingSpinner = () => {
//   return (
//     <div className='flex justify-center items-center'>
//       <div className='flex space-x-4'>
//         <div className='w-6 h-6 bg-purple-500 rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
//         <div className='w-6 h-6 bg-yellow-500 rounded-full animate-bounce delay-200' style={{ animationDelay: '0.2s' }}></div>
//         <div className='w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-400' style={{ animationDelay: '0.4s' }}></div>
//         <div className='w-6 h-6 bg-yellow-500 rounded-full animate-bounce delay-600' style={{ animationDelay: '0.6s' }}></div>
//         <div className='w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-800' style={{ animationDelay: '0.8s' }}></div>
//       </div>
//     </div>
//   );
// };
