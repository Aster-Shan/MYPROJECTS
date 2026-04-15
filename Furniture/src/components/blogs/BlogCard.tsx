import type { Post } from "@/types";
import { Link } from "react-router-dom";

interface Postprops {
  posts: Post[];
}
const imageUrl = import.meta.env.VITE_ASSET_URL;

function BlogCard({ posts }: Postprops) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-0">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            src={imageUrl + post.image}
            alt="Blog Post"
            className="full rounded-2xl mb-4 "
            loading="lazy"
            decoding="async"
          />
          <h3 className="line-clamp-1 ml-4 font-semibold">{post.title}</h3>
          <div className="ml-4 mt-2 text-sm ">
            <span>
              by
              <span className="font-semibold ml-2 mr-2">
                {post.author?.fullName ?? "Unknown author"}
              </span>
              on
              <span className="font-semibold ml-2 "> {post.updatedAt} </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;
