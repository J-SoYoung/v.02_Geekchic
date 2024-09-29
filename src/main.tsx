import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// 기본페이지
import App from './App.tsx';
import ErrorPage from './ErrorPage.tsx';
// url 생성 페이지
import {
  Carts,
  Home,
  Login,
  Mypage,
  OrderDetail,
  Payments,
  ProductsDetail,
  ProductsUpload,
  Profile,
  PurchaseDetail,
  PurchaseList,
  SellsList,
  UsedHome,
  UsedMessage,
  UsedMessageList,
  UsedProductsDetail,
  UsedProductsEdit,
  UsedProductsUpload,
  WishList,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/products/new', element: <ProductsUpload /> },
      { path: '/products/detail/:productId', element: <ProductsDetail /> },
      { path: '/wishlist/:userId', element: <WishList /> },
      { path: '/orders/:orderId', element: <OrderDetail /> },
      { path: '/payments/:orderId', element: <Payments /> },
      { path: '/used', element: <UsedHome /> },
      { path: '/used/new', element: <UsedProductsUpload /> },
      { path: '/used/edit/:productId', element: <UsedProductsEdit /> },
      { path: '/used/detail/:productId', element: <UsedProductsDetail /> },
      { path: '/message/send/:messageId', element: <UsedMessage /> },
      { path: '/my/:userId', element: <Mypage /> },
      { path: '/my/profile/:userId', element: <Profile /> },
      { path: '/my/sellsList/:userId', element: <SellsList /> },
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
