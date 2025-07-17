import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";
import ProductRootLayout from "@/pages/products/ProductRootLayout";
import RootLayout from "@/pages/RootLayout";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
const SuspenseFallback = () => (
  <div className="text-center py-10">Loading...</div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      {
        path: "blogs",
        async lazy() {
          const mod = await import("@/pages/blogs/BlogRootLayout");
          const Component = mod.default;
          return {
            Component: () => (
              <Suspense fallback={<SuspenseFallback />}>
                <Component />
              </Suspense>
            ),
          };
        },
        children: [
          {
            index: true,
            async lazy() {
              const mod = await import("@/pages/blogs/Blog");
              const Component = mod.default;
              return {
                Component: () => (
                  <Suspense fallback={<SuspenseFallback />}>
                    <Component />
                  </Suspense>
                ),
              };
            },
          },
          {
            path: ":postId",
            async lazy() {
              const mod = await import("@/pages/blogs/BlogDetail");
              const Component = mod.default;
              return {
                Component: () => (
                  <Suspense fallback={<SuspenseFallback />}>
                    <Component />
                  </Suspense>
                ),
              };
            },
          },
        ],
      },
      {
        path: "products",
        Component: ProductRootLayout,
        children: [
          { index: true, Component: ProductPage },
          { path: ":productId", Component: ProductDetailPage },
        ],
      },
    ],
  },
]);
