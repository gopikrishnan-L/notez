import Post from "@/components/post/Post";
import { getBlogByCategories } from "@/db/blogs";

export default async function CategoryPage({
  params,
}: {
  params: { tag: string };
}) {
  const blogs = await getBlogByCategories([params.tag]);
  return (
    <div>
      <h2 className="text-3xl mb-2">
        Blogs by category:{" "}
        <span className="font-semibold capitalize">{params.tag}</span>
      </h2>
      {blogs.map((blog) => (
        <Post key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
