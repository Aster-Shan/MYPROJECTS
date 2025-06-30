import { createBrowserRouter } from "react-router";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import Products from "./pages/Products";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/about/*", Component: About },
  {
    path: "/products",
    Component: Dashboard,
    children: [{ index: true, Component: Products }],
  },
]);
