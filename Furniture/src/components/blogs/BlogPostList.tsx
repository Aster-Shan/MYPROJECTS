import type { Post } from "@/types";
import { Link } from "react-router-dom";
interface Postprops {
  posts: Post[];
}

function BlogPostList({ posts }: Postprops) {
  return (
    <div className="px-4 my-8 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 md:px-4">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            src={post.image}
            alt="Blog Post"
            className="full rounded-xl mb-4 "
          />
          <h2 className="line-clamp-1 text-xl font-extrabold">{post.title}</h2>
          <h3 className="my-2 line-clamp-3 font-[400]">{post.content}</h3>
          <div className="mt-2 text-sm ">
            <span>
              by<span className="font-[600]"> {post.author} </span>on
              <span className="font-[600]"> {post.updated_at} </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogPostList;
