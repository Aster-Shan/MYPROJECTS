import AboutPage from "@/pages/About";
import BlogPage from "@/pages/blogs/Blog";
import BlogDetailPages from "@/pages/blogs/BlogDetail";
import BlogRootLayout from "@/pages/blogs/BlogRootLayout";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";
import ProductRootLayout from "@/pages/products/ProductRootLayout";
import RootLayout from "@/pages/RootLayout";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
// eslint-disable-next-line react-refresh/only-export-components

// const SuspenseFallback = () => (
//   <div className="text-center py-10">Loading...</div>
// );

import { homeLoader } from "./router/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage, loader: homeLoader },
      { path: "about", Component: AboutPage },
      {
        path: "blogs",
        element: (
          <Suspense
            fallback={<div className="text-center py-10">Loading...</div>}
          >
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<div className="text-center py-10">Loading...</div>}
              >
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense
                fallback={<div className="text-center py-10">Loading...</div>}
              >
                <BlogDetailPages />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        Component: ProductRootLayout,
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<div className="text-center py-10">Loading...</div>}
              >
                <ProductPage />
              </Suspense>
            ),
          },
          { path: ":productId", Component: ProductDetailPage },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
]);
