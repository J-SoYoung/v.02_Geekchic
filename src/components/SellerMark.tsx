import { useRecoilValue } from "recoil";

import { userState } from "@/_recoil";
import { Icon_King } from "@/_assets";


// 로그인 유저가 판매자인 경우 Icon생성하기
// ⭕위치 지정 어디로?
export const SellerMark = ({ sellerId }: { sellerId: string | null }) => {
  const loginUser = useRecoilValue(userState);
  if (sellerId && sellerId == loginUser._id)
    return <img src={Icon_King} className="w-4 m-2 absolute top-0 right-0 " alt="유저가 판매자" />;
};
