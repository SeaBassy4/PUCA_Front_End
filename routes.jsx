// routes imports
import OrdersPage from "./src/pages/OrdersPage";
import ProductsPage from "./src/pages/ProductsPage";
import HistoryPage from "./src/pages/HistoryPage";

const routes = [
  { path: "/ordenes", element: <OrdersPage /> },
  { path: "/productos", element: <ProductsPage /> },
  { path: "/historial", element: <HistoryPage /> },
];

export default routes;
