// "use client";

import { getAllBlogs } from "@/db/blogs";

// import { useEffect, useState } from "react";

export default async function Home() {
  const blogPosts = await getAllBlogs();
  return (
    <div className="grid grid-cols-[3fr_1fr] max-w-[75rem] mx-auto gap-4 ">
      <HighLights />
      <div className="w-full h-full text-lg font-semibold">Editors' Picks</div>
      <div className="flex flex-col gap-8 row-start-2 max-w-[50rem]">
        {blogPosts.map((blog) => (
          <Post
            key={blog.id}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
}

const highlightCards = [
  { color: "bg-blue-400" },
  { color: "bg-orange-400" },
  { color: "bg-zinc-400" },
  { color: "bg-purple-400" },
  { color: "bg-red-400" },
];

function HighLights() {
  // const [active, setActive] = useState(0);
  // useEffect(() => {
  //   const changeCard = setInterval(() => {
  //     setActive(active + (1 % 6));
  //   }, 1000);

  //   return () => {
  //     clearInterval(changeCard);
  //   };
  // }, [active, setActive]);

  return (
    <div className="col-span-2">
      <p className="text-3xl font-bold mb-2">Highlights of The Week</p>
      <section className="grid h-[25rem] grid-cols-4 gap-2 mb-4 transition-all">
        {highlightCards.map((card, i) => (
          <div
            key={i}
            className={`${card.color} w-full rounded-xl ${
              i === 0 && "col-start-1 col-end-3 row-start-1 row-end-4"
            } ${i === 1 && "col-start-3 col-end-4 row-start-1 row-end-3"} ${
              i === 2 && "col-start-4 col-end-5 row-start-2 row-end-4"
            }`}
          >
            {i}
          </div>
        ))}
      </section>
    </div>
  );
}

function Post({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full h-16 rounded-t-lg bg-black"></div>
      <div className="text-xl font-medium">{title}</div>
      <div className="mt-2">{description}</div>
    </div>
  );
}
