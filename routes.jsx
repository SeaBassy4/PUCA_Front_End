// routes imports
import OrdersPage from "./src/pages/OrdersPage";
import ProductsPage from "./src/pages/ProductsPage";
import HistoryPage from "./src/pages/HistoryPage";
import UsersPage from "./src/pages/UsersPage";
import ReportsPage from "./src/pages/ReportsPage";
import CustomerPage from "./src/pages/CustomerPage";

const routes = [
  { path: "/ordenes", element: <OrdersPage /> },
  { path: "/productos", element: <ProductsPage /> },
  { path: "/historial", element: <HistoryPage /> },
  { path: "/usuarios", element: <UsersPage /> },
  { path: "/reportes", element: <ReportsPage /> },
  { path: "/clientes", element: <CustomerPage /> },
  { path: "/", element: <OrdersPage /> },
];

export default routes;
