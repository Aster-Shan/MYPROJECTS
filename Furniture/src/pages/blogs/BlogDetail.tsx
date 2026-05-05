// howto get route params

import { OnePostQuery, postQuery } from "@/api/query";
import RichTextRenderer from "@/components/blogs/RichTextRenderer";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import type { Post, Tag } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
const imageUrl = import.meta.env.VITE_ASSET_URL;

function BlogDetail() {
  // const post = posts.find((post) => post.id === postId);
  const { postId } = useLoaderData();
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=6"));
  const { data: postDetail } = useSuspenseQuery(OnePostQuery(postId));

  return (
    <div className="container mx-auto px-4 lg:px-2">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant="outline" asChild className="mb-6 mt-8">
            <Link to={"/blogs"}>
              <Icons.ArrowLeft></Icons.ArrowLeft>
              All Posts
            </Link>
          </Button>
          {postDetail ? (
            <>
              <h2 className="text-3xl font-extrabold mb-3">
                {postDetail.post.title}
              </h2>
              <div className="mt-2 text-sm ">
                <span>
                  by
                  <span className="font-[600]">
                    {" "}
                    {postDetail.post.author.fullName}{" "}
                  </span>
                  on
                  <span className="font-[600]">
                    {" "}
                    {postDetail.post.updatedAt}{" "}
                  </span>
                </span>
              </div>
              <h3 className="text-base font-[400] my-6">
                {postDetail.post.content}
              </h3>
              <img
                src={imageUrl + postDetail.post.image}
                alt={postDetail.post.title}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl"
              />
              <RichTextRenderer
                content={postDetail.post.body}
                className="my-8"
              ></RichTextRenderer>
              <div className="mb-12 space-x-2">
                {postDetail.post.tags.map((tag: Tag) => (
                  <Button variant="secondary">{tag.name}</Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground">
              No Post Found
            </p>
          )}
        </section>
        <section className="w-full lg:w-1/4 lg:mt-24">
          <div className="mb-8 flex items-center gap-2 text-base font-semibold">
            <Icons.Layers></Icons.Layers>
            <h3 className="">Other Blog Posts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {postsData.posts.map((post: Post) => (
              <Link
                to={`/blogs/${post.id}`}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={imageUrl + post.image}
                  alt="blog posts"
                  className="w-1/4 rounded"
                  loading="lazy"
                  decoding="async"
                />
                <div className="w-3/4 text-sm font-[500] text-muted-foreground">
                  <p className="line-clamp-2">{post.content}</p>
                  <i>...see more</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default BlogDetail;
