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
    path: `/frontdesk/SalesInerface`,
    title: "銷售",
    useable: true,
    icon: faThLarge,
    children: [
      {
        path: `/frontdesk/SalesInerface`,
        title: "銷售",
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
    title: "商品管理",
    useable: true,
    icon: faShoppingBag,
    children: [
      {
        path: `/backdesk/Product/Product`,
        title: "商品管理",
        useable: false,
        id: "D01",
      },
    ],
  },
  {
    path: `/backdesk/Setting`,
    title: "設定",
    useable: true,
    icon: faSlidersH,
    children: [
      {
        path: `/backdesk/Setting`,
        title: "設定",
        useable: false,
        id: "D01",
      },
    ],
  },
];
