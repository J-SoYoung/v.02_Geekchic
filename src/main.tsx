import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// 기본페이지
import App from './App.tsx';
import ErrorPage from './ErrorPage.tsx';
// url 생성 페이지
import Home from './pages/home';
import Products from './pages/products';
import ProductsDetail from './pages/productsDetail';
import ProductsUpolad from './pages/productsUpload';
import WishList from './pages/wishList';
import OrderDetail from './pages/orderDetail';
import Payments from './pages/payments';
import UsedHome from './pages/usedHome';
import UsedProductsUpload from './pages/usedProductsUpload';
import UsedProductsDetail from './pages/usedProductsDetail';
import UsedMessage from './pages/usedMessage';
import Login from './pages/login';
import Mypage from './pages/mypage';
import Profile from './pages/profile';
import SalesList from './pages/salesList';
import PurchaseList from './pages/purchaseList';
import Carts from './pages/carts';
import UsedMessageList from './pages/usedMessageList';
import PurchaseDetail from './pages/purchaseDetail';

// ⭕error컴포넌트 활용하기
// 기본 라우터 뒤에 errorElement: <ErrorPage />, 추가하면 된데. 해당 문구랑 처리 가능한가>
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/products', element: <Products /> }, //⭕탭 있는 페이지, 굳이??
      { path: '/products/new', element: <ProductsUpolad /> },
      { path: '/products/detail/:itemId', element: <ProductsDetail /> },
      { path: '/wishlist/', element: <WishList /> }, //⭕임시페이지
      // { path: '/wishlist/:userId', element: <WishList /> },
      { path: '/orders/:orderId', element: <OrderDetail /> },
      { path: '/payments/:orderId', element: <Payments /> },
      { path: '/used', element: <UsedHome /> },
      { path: '/used/new', element: <UsedProductsUpload /> },
      { path: '/used/detail/:itemId', element: <UsedProductsDetail /> },
      { path: '/message/send/:itemId/:buyerId', element: <UsedMessage /> },
      { path: '/my', element: <Mypage /> }, //⭕임시페이지
      // { path: '/my/:userId', element: <Mypage /> },
      { path: '/my/profile/:userId', element: <Profile /> },
      { path: '/my/salesList/:userId', element: <SalesList /> },
      { path: '/my/purchasesList/:userId', element: <PurchaseList /> },
      { path: '/my/carts/:userId', element: <Carts /> },
      { path: '/my/messagesList/:userId', element: <UsedMessageList /> },
      { path: '/my/purchases/detail/:userId', element: <PurchaseDetail /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
