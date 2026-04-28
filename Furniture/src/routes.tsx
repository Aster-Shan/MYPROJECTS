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
import { createBrowserRouter, redirect } from "react-router";
import LoginPage from "./pages/auth/Login";
// eslint-disable-next-line react-refresh/only-export-components

// const SuspenseFallback = () => (
//   <div className="text-center py-10">Loading...</div>
// );

import AuthRootLayout from "./pages/auth/AuthRootLayout";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword";
import OtpPage from "./pages/auth/Otp";
import SignUpPage from "./pages/auth/SignUp";
import {
  confirmAction,
  loginAction,
  logoutAction,
  otpAction,
  registerAction,
} from "./router/action";
import {
  blogInfiniteLoader,
  confirmLoader,
  homeLoader,
  loginLoader,
  otpLoader,
  postLoader,
} from "./router/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
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
            loader: blogInfiniteLoader,
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
            loader: postLoader,
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
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        element: <SignUpPage></SignUpPage>,
        loader: loginLoader,
        action: registerAction,
      },
      { path: "otp", Component: OtpPage, loader: otpLoader, action: otpAction },
      {
        path: "confirm-password",
        Component: ConfirmPasswordPage,
        loader: confirmLoader,
        action: confirmAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);
