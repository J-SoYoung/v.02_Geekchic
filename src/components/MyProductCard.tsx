interface MyProductCardPropsType {
  image: string;
  productName: string;
  price: number;
  quantity?: number; // 장바구니 페이지에서만 필요
  isCarts?: boolean; // 장바구니 페이지인지 여부
  size: string;
}

export const MyProductCard = ({
  image,
  productName,
  price,
  quantity,
  isCarts = false,
  size,
}: MyProductCardPropsType) => {
  return (
    <div className='flex items-center justify-between border rounded-md p-3 mb-2'>
      <img
        src={image}
        alt={productName}
        className='w-16 h-16 object-cover rounded-md'
      />
      <div className='flex-1 ml-4'>
        <h2 className='text-sm font-bold'>{productName}</h2>
        <p className='text-sm text-gray-500'>{size}</p>
        <p className='text-base font-bold'>{price.toLocaleString()}원</p>
      </div>
      {isCarts && (
        <div className='flex items-center'>
          <span className='text-sm text-gray-500'>x {quantity}</span>
        </div>
      )}
    </div>
  );
};
