import { useNavigate } from "react-router-dom";

interface MyProductCardPropsType {
  createdAt: string[];
  productImage: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  paymentsId?: string;
}

export const MyProductCard = ({
  createdAt,
  productImage,
  productName,
  size,
  quantity,
  price,
  paymentsId,
}: MyProductCardPropsType) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start p-4 rounded-md border-b'>
      <p className='text-m text-gray-500 mb-2'>{createdAt[0]}</p>
      <div className='w-full flex relative'>
        <img
          src={productImage}
          alt={productName}
          className='w-16 h-16 mr-4 object-cover rounded-md'
        />
        <div className='flex flex-col items-start'>
          <h2 className='text-sm font-bold'>{productName}</h2>
          <span className='text-sm text-gray-500'>
            {size} | {quantity}개
          </span>
          <p className='text-base font-bold'>{price.toLocaleString()}원</p>
        </div>
        {paymentsId && <button onClick={()=>navigate(`/my/purchases/detail/${paymentsId}`)} className="absolute right-0 text-sm">주문 상세내역 보기</button>}
      </div>
    </div>
  );
};
