import BlogPostList from "@/components/blogs/BlogPostList";
import { posts } from "@/data/posts";
function Blog() {
  return (
    <div className="container mx-auto">
      <h1 className="mt-8 text-2xl font-bold text-center md:text-left">
        Latest Blog Posts
      </h1>
      <BlogPostList posts={posts}></BlogPostList>
    </div>
  );
}

export default Blog;
