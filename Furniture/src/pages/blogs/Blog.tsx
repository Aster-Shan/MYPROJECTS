import { postInfiniteQuery } from "@/api/query";
import BlogPostList from "@/components/blogs/BlogPostList";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";

function Blog() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,

    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(postInfiniteQuery());

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <h1 className="mt-8 text-2xl font-bold text-center md:text-left">
        Latest Blog Posts
      </h1>
      <BlogPostList posts={allPosts}></BlogPostList>
      <div className="my-4 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? "ghost" : "secondary"}
        >
          {isFetchingNextPage
            ? "Loading More ... "
            : hasNextPage
              ? "Load More"
              : "No More Page"}
        </Button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}

export default Blog;
