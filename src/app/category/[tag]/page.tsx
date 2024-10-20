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
        <Post
          key={blog.id}
          title={blog.title}
          description={blog.description}
          categories={blog.categories}
          date={blog.createdAt}
          creatorId={blog.creatorId}
          postUrl={`/blog/${blog.id}`}
        />
      ))}
    </div>
  );
}
