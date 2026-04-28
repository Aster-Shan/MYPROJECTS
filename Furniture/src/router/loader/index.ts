import { authApi } from "@/api";
import {
  OnePostQuery,
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
} from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");

//     return { productsData: products.data, postsData: posts.data };
//   } catch (error) {
//     console.log("HomeLoader eror:", error);
//     throw error;
//   }
// };
export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    return redirect("/");
    if (response.status !== 200) {
      return null;
    }
  } catch (error) {
    console.log("Loader eror:", error);
  }
};
export const otpLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }
  return null;
};
export const confirmLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};
export const homeLoader = async () => {
  await queryClient.ensureQueryData(productQuery("?limit=8"));
  await queryClient.ensureQueryData(postQuery("?limit=3"));
  return null;
};
export const blogInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postInfiniteQuery());
  return null;
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("No Post ID provided");
  }
  await queryClient.ensureQueryData(postQuery("?limit=6"));
  await queryClient.ensureQueryData(OnePostQuery(Number(params.postId)));
  return { postId: params.postId };
};
