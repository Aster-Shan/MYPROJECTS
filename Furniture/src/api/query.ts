import type { QueryFunctionContext } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5min cache
    },
  },
});
const fetchproducts = (q?: string) =>
  api.get(`users/products${q ?? ""}`).then((res) => res.data);

export const productQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchproducts(q),
});

const fetchPosts = (q?: string) =>
  api.get(`users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

const fetchInfinitePosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?limit=6&cursor=${pageParam}` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};
export const postInfiniteQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null,
  getNextPageParam: (lastpage, pages) => lastpage.nextCursor ?? undefined,
  // getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor?? undefined,
});

const fetchOnePost = async ({ queryKey }: QueryFunctionContext) => {
  const [, , id] = queryKey;
  if (typeof id !== "number") {
    throw new Error("Invalid post ID");
  }

  const post = await api.get(`users/posts/${id}`);
  if (!post?.data) {
    throw new Response("", { status: 404, statusText: "Not Found" });
  }
  return post.data;
};

export const OnePostQuery = (id: number) => ({
  queryKey: ["posts", "detail", id],
  queryFn: fetchOnePost,
});
const fetchCategoryType = async()=> api.get("users/filter-type").then((res) => res.data);\

export const categoryTypeQuery = ()=>({
  queryKey:["category",],
  queryFn:fetchCategoryType,
})