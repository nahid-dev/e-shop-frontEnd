import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Dashboard from "../layouts/Dashboard";
import ProductList from "../pages/productList/ProductList";
import CustomerList from "../pages/customerList/CustomerList";
import Overview from "../pages/overview/Overview";
import OrderList from "../pages/orderList/OrderList";
import ProductDetails from "../components/productDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/overview",
        element: <Overview></Overview>,
      },
      {
        path: "/dashboard/customerList",
        element: <CustomerList></CustomerList>,
      },
      {
        path: "/dashboard/orderList",
        element: <OrderList></OrderList>,
      },
      {
        path: "/dashboard/productList",
        element: <ProductList></ProductList>,
      },
      {
        path: "/dashboard/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
]);

export default router;
