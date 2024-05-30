import {
  faThLarge,
  faClipboard,
  faArchive,
  faSlidersH,
  faChartPie,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";


export default [
  {
    path: `/backdesk/Dashboard`,
    title: "總覽",
    useable: true,
    icon: faThLarge,
    children: [
      {
        path: `/backdesk/Dashboard`,
        title: "總覽",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/OrderMean`,
    title: "訂單管理",
    useable: true,
    icon: faClipboard,
    children: [
      {
        path: `/backdesk/OrderMean`,
        title: "訂單管理",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/Product/Product`,
    title: "商品",
    useable: true,
    icon: faShoppingBag,
    children: [
      {
        path: `/backdesk/Product/Product`,
        title: "商品",
        useable: false,
        id: "D01",
      },
      {
        path: `/backdesk/Product/ProductType`,
        title: "分類",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/Inventory/Inventory`,
    title: "庫存",
    useable: true,
    icon: faArchive,
    children: [
      {
        path: `/backdesk/Inventory/Inventory`,
        title: "商品庫存",
        useable: false,
        id: "D01",
      },
      {
        path: `/backdesk/Inventory/Purchase`,
        title: "進貨單",
        useable: false,
        id: "D01",
      },
      {
        path: `/backdesk/Inventory/Company`,
        title: "供應商",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/ReportAnalysis`,
    title: "報表及分析",
    useable: true,
    icon: faChartPie,
    children: [
      {
        path: `/backdesk/ReportAnalysis`,
        title: "報表匯出",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/Setting`,
    title: "店面管理",
    useable: true,
    icon: faSlidersH,
    children: [
      {
        path: `/backdesk/Information`,
        title: "基本資料",
        useable: false,
        id: "D01",
      },
      {
        path: `/backdesk/SettingUser`,
        title: "員工",
        useable: false,
        id: "D01",
      },
      {
        path: `/backdesk/SettingPay`,
        title: "付款設定",
        useable: false,
        id: "D01",
      }
    ],
  },
];
