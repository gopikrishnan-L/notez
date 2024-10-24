import Post from "@/components/post/Post";
import { getAllBlogs } from "@/db/blogs";
import { getUserAsCreator } from "@/db/users";
import Link from "next/link";

export default async function HomePage() {
  const blogPosts = await getAllBlogs();
  return (
    <div className="grid grid-cols-[3fr_1fr] max-w-[75rem] mx-auto gap-4 max-xl:max-w-[60rem] max-lg:max-w-[40rem] max-lg:grid-cols-1">
      <HighLights />
      <div className="w-full h-full text-lg font-semibold">Editors' Picks</div>
      <div className="grid grid-cols-1 gap-2 max-lg:w-full lg:row-start-2">
        {blogPosts.map((blog, i) => (
          <Post
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
}

const highlightCards = [
  { color: "bg-[#EBEEF3]" },
  { color: "bg-[#E1E8F0]" },
  { color: "bg-[#EBEEF3]" },
  { color: "bg-[#E1E8F0]" },
];

function HighLights() {
  return (
    <div className="lg:col-span-2 mb-8">
      <section className="grid h-[38rem] grid-cols-[3fr_1fr] gap-4 mb-4 transition-all">
        {highlightCards.map((card, i) => (
          <div
            key={i}
            className={`${card.color} w-full rounded-xl ${
              i === 0 && "row-span-3"
            }`}
          >
            {i}
          </div>
        ))}
      </section>
    </div>
  );
}
