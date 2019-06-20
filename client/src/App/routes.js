import Loadable from "react-loadable";
import Loading from "components/Loading";

const UserPage = Loadable({
  loader: () => import("views/UserList"),
  loading: Loading
});

const ShoppingPage = Loadable({
  loader: () => import("views/Shopping"),
  loading: Loading
});

const ProductPage = Loadable({
  loader: () => import("views/ProductList"),
  loading: Loading
});

const DashboardPage = Loadable({
  loader: () => import("views/Dashboard"),
  loading: Loading
});

const routes = [
  {
    path: "/app/users",
    component: UserPage,
    title: "USERS"
  },
  {
    path: "/app/shopping",
    component: ShoppingPage,
    title: "SHOPPING"
  },
  {
    path: "/app/product",
    component: ProductPage,
    title: "Product"
  },
  {
    path: "/app/dashboard",
    component: DashboardPage,
    title: "dashboard"
  }
];

export default routes;
