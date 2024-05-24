import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import {Login } from "../pages/Auth/index"
import Dashboard from '../pages/backdesk/Dashboard/Dashboard'
import OrderMean from "../pages/backdesk/OrderMean/OrderMean"
import Product from '../pages/backdesk/Product/Product'
import ProductType from '../pages/backdesk/Product/ProductType'

import SalesInerface from "../pages/frontdesk/sales/SalesInerface"

import BackLayout  from '../layouts/BackLayout'
import FrontLayout from "../layouts/FrontLayout"
import ErrorPage from '../pages/errorPage'

  
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },{
    path: "/backdesk",
    element: <BackLayout  />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/backdesk/Dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/backdesk/OrderMean",
        element: <OrderMean/>,
      },
      {
        path: "/backdesk/Product/Product",
        element: <Product/>,
      },
      {
        path: "/backdesk/Product/ProductType",
        element: <ProductType/>,
      },
      {
        path: "/backdesk/Inventory/Inventory",
        element: <Dashboard/>,
      },
      {
        path: "/backdesk/Inventory/Purchase",
        element: <Dashboard/>,
      },
      {
        path: "/backdesk/Inventory/Company",
        element: <Dashboard/>,
      },
      {
        path: "/backdesk/ReportAnalysis",
        element: <Dashboard/>,
      },
      {
        path: "/backdesk/Setting",
        element: <Dashboard/>,
      },
    ],
  },
  {
    path: "/frontdesk",
    element: <FrontLayout  />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/frontdesk/SalesInerface",
        element: <SalesInerface/>,
      },
      
    ],
  },
]);