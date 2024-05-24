import { Route, Routes } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import {Login } from "../pages/Auth/index"
import Dashboard from '../pages/backdesk/Dashboard/Dashboard'
import OrderMean from "../pages/backdesk/OrderMean/OrderMean"
import Product from '../pages/backdesk/Product/Product'
import ProductType from '../pages/backdesk/Product/ProductType'
import Inventory from '../pages/backdesk/Inventory/Inventory'
import Component from '../pages/backdesk/Inventory/Company/Company'
import Purchase from '../pages/backdesk/Inventory/Purchase/Purchase'
import ReportAnalysis from '../pages/backdesk/ReportAnalysis/ReportAnalysis'
import Setting from '../pages/backdesk/Setting/Setting'

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
        element: <Inventory/>,
      },
      {
        path: "/backdesk/Inventory/Purchase",
        element: <Purchase/>,
      },
      {
        path: "/backdesk/Inventory/Company",
        element: <Component/>,
      },
      {
        path: "/backdesk/ReportAnalysis",
        element: <ReportAnalysis/>,
      },
      {
        path: "/backdesk/Setting",
        element: <Setting/>,
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