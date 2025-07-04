import AboutPage from "@/pages/About";
import BlogPage from "@/pages/blogs/Blog";
import ErrorPage from "@/pages/Error";
import HomePage from "@/pages/Home";
import RootLayout from "@/pages/RootLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "blogs", Component: BlogPage },
    ],
  },
]);
