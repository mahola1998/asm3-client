import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { loader as loaderUser } from "./Layout/Layout";
import HomePage, { loader as loaderProduct } from "./page/HomePage";
import ShopPage from "./page/ShopPage";
import DetailPage from "./page/DetailPage";
import CartPage from "./page/CartPage";
import CheckoutPage from "./page/CheckoutPage";
import LoginPage, { action as loginAction } from "./page/LoginPage";
import RegisterPage, { action as registerAction } from "./page/RegisterPage";
import OrderHistory from "./page/OrderHistory";
import OrderDetail from "./page/OrderDetail";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    loader: loaderUser,
    children: [
      { index: true, element: <HomePage />, loader: loaderProduct },
      { path: "shop", element: <ShopPage />, loader: loaderProduct },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: loaderProduct,
      },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage />, loader: loaderUser },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
      { path: "order", element: <OrderHistory /> },
      { path: "order/:orderId", element: <OrderDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
