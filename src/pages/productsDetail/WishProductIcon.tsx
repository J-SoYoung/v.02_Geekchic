import { Icon_FullHeart, Icon_Heart } from '@/_assets';
interface WishProductIconProps {
  currentWishState: boolean;
  onClickWishProduct: () => void;
}
export const WishProductIcon = ({
  currentWishState,
  onClickWishProduct,
}: WishProductIconProps) => {
  return (
    <button onClick={onClickWishProduct}>
      <img
        src={currentWishState ? Icon_FullHeart : Icon_Heart}
        className='w-8 h-8 absolute top-50 right-10'
      />
    </button>
  );
};
