import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import ErrorPage from "../Dashboard/ErrorPage/ErrorPage";
import Dashboard from "../Dashboard/Dashboard";
import AddProducts from "../Dashboard/Pages/AddProducts/AddProducts";
import AllProducts from "../Dashboard/Pages/AllProducts/AllProducts";
import AllReturn from "../Dashboard/Pages/AllReturn/AllReturn";
import AllSalesReport from "../Dashboard/Pages/AllSalesReport/AllSalesReport";
import CustomerInfo from "../Dashboard/Pages/CustomerInfo/CustomerInfo";
import ReturnProductsAdd from "../Dashboard/Pages/ReturnProductsAdd/ReturnProductsAdd";
import SalesReport from "../Dashboard/Pages/SalesReport/SalesReport";
import Stock from "../Dashboard/Pages/Stock/Stock";
import Sales from "../Dashboard/Pages/Sales/Sales";
import UpdateProduct from "../Dashboard/Pages/UpdateProducts/UpdateProduct";
import ProductsList from "../Dashboard/Pages/ProductList/ProductList";
import AddCustomer from "../Dashboard/Pages/AddCustomer/AddCustomer";
import SalesInvoice from "../Dashboard/Pages/SalesInvoice/SalesInvoice";
import ProductsBuy from "../Dashboard/Pages/ProductsBuy/ProductsBuy"
import PurchaseReport from "../Dashboard/Pages/PurchaseReport/PurchaseReport"
import PurchaseReportDetails from "../Dashboard/Pages/PurchaseReportDetails/PurchaseReportDetails";
import CustomerInfoDetails from "../Dashboard/Pages/CustomerInfo/CustomerInfoDetails";
import PrivateRoute from "./PrivateRoute";
import PublicPage from "./PrblicPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <PublicPage><Home /></PublicPage>
            },
            {
                path: 'update-product/:id',
                element: <PrivateRoute><UpdateProduct /></PrivateRoute>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: 'add-product',
                element: <PrivateRoute><AddProducts /></PrivateRoute>
            },
            {
                path: 'sales',
                element: <PrivateRoute><Sales /></PrivateRoute>
            },
            {
                path: 'sales-print/:id',
                element: <PrivateRoute><SalesInvoice /></PrivateRoute>
            },
            {
                path: 'sales-print/:id',  // Dynamic route for Sales Invoice
                element: <PrivateRoute><SalesInvoice /></PrivateRoute>
              },
            {
                path: 'all-products',
                element: <PrivateRoute><AllProducts /></PrivateRoute>
            },
            {
                path: 'all-return',
                element: <PrivateRoute><AllReturn /></PrivateRoute>
            },
            {
                path: 'all-sales-report',
                element: <PrivateRoute><AllSalesReport /></PrivateRoute>
            },
            {
                path: 'customer-info',
                element: <PrivateRoute><CustomerInfo /></PrivateRoute>
            },
            {
                path: 'customer-info/:id',
                element: <PrivateRoute><CustomerInfoDetails /></PrivateRoute>
            },
            {
                path: 'add-return',
                element: <PrivateRoute><ReturnProductsAdd /></PrivateRoute>
            },
            {
                path: 'sales-report',
                element: <PrivateRoute><SalesReport /></PrivateRoute>
            },
            {
                path: 'stock',
                element: <PrivateRoute><Stock /></PrivateRoute>
            },
            {
                path: 'products-list',
                element: <PrivateRoute><ProductsList /></PrivateRoute>
            },
            {
                path: 'add-customer',
                element: <PrivateRoute><AddCustomer /></PrivateRoute>
            },
            // this is products buy route
            {
                path: 'products-buy',
                element: <PrivateRoute><ProductsBuy/></PrivateRoute>
            },
            {
                path: 'purchase-report',
                element: <PrivateRoute><PurchaseReport/></PrivateRoute>
            },
            {
                path: 'purchase-report/:id',
                element: <PrivateRoute><PurchaseReportDetails/></PrivateRoute>
            },
            {
                path: 'all-sales-report',
                element: <PrivateRoute> <AllSalesReport/></PrivateRoute>
            },
        ]

    }
]);

