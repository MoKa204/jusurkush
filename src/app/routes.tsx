import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loan from "./pages/Loan";
import Wishlist from "./pages/Wishlist";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/products", Component: Products },
  { path: "/product/:id", Component: ProductDetail },
  { path: "/cart", Component: Cart },
  { path: "/checkout", Component: Checkout },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/loan", Component: Loan },
  { path: "/wishlist", Component: Wishlist },
]);
