interface MyProductCardPropsType {
  createdAt: string[];
  productImage: string;
  productName: string;
  price: number;
  quantity: number; 
  isCarts?: boolean; // 장바구니 페이지인지 여부
  size: string;
}

export const MyProductCard = ({
  createdAt,
  productImage,
  productName,
  size,
  quantity,
  price,
}: MyProductCardPropsType) => {
  return (
    <div className='flex flex-col items-start p-4 rounded-md border-b'>
      <p className='text-m text-gray-500 mb-2'>{createdAt[0]}</p>
      <div className='flex '>
        <img
          src={productImage}
          alt={productName}
          className='w-16 h-16 mr-4 object-cover rounded-md'
        />
        <div className='flex flex-col items-start'>
          <h2 className='text-sm font-bold'>{productName}</h2>
          <p>
            <span className='text-sm text-gray-500'>{size}</span> |
            <span className='text-sm text-gray-500'> {quantity}개</span>
          </p>
          <p className='text-base font-bold'>{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};
