// "use client";

import { getAllBlogs } from "@/db/blogs";
import { getUserAsCreator } from "@/db/users";
import Link from "next/link";

// import { useEffect, useState } from "react";

export default async function Home() {
  const blogPosts = await getAllBlogs();
  return (
    <div className="grid grid-cols-[3fr_1fr] max-w-[75rem] mx-auto gap-4 max-xl:max-w-[60rem] max-lg:max-w-[40rem] max-lg:grid-cols-1">
      <HighLights />
      <div className="w-full h-full text-lg font-semibold">Editors' Picks</div>
      <div className="grid grid-cols-3 gap-2 max-lg:w-full lg:row-start-2">
        {blogPosts.map((blog, i) => (
          <Post
            key={blog.id}
            title={blog.title}
            description={blog.description}
            creatorId={blog.creatorId}
            date={blog.createdAt}
            postUrl={`/blogs/${blog.id}`}
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
    <div className="lg:col-span-2 mb-8">
      {/* <p className="text-3xl font-bold mb-2">Highlights of The Week</p> */}
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

async function Post({
  title,
  description,
  creatorId,
  date,
  postUrl = "/",
}: {
  title: string;
  description: string;
  creatorId: string;
  date: Date;
  postUrl: string;
}) {
  const creator = await getUserAsCreator(creatorId);
  return (
    <article className="w-full h-full p-2 rounded-lg border-[1px]">
      <div className="w-full h-full flex flex-col group relative">
        <Link
          href={postUrl}
          className="h-[12rem] shrink-0 w-full mx-auto overflow-clip rounded-lg bg-[#EBEEF3] cursor-pointer"
        >
          <img src={""} alt="" className="object-cover" />
        </Link>
        <div className="flex flex-col gap-2 px-2 flex-1">
          <section className=" mt-2 mb-2 text-xs font-medium p-1 bg-violet-100 text-violet-600 w-fit rounded-md">
            Tag/Genre
          </section>
          <Link href={postUrl} className="cursor-pointer">
            <p className="text-lg h-[2ch] font-semibold mb-2 line-clamp-1">
              {title}
            </p>
            <p className="text-sm line-clamp-3">{description}</p>
          </Link>
          <div className="mt-auto pt-2 flex gap-2 items-center text-xs">
            <div className="w-8 aspect-square rounded-full overflow-hidden bg-gray-700">
              <img src={creator?.image!} alt={creator?.name!} />
            </div>
            <span className="opacity-75">{creator?.name}</span>
            <span className="ml-auto opacity-75">
              {date.toLocaleString("default", { month: "long" }) +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}
            </span>
          </div>
        </div>
        {/* <div className="w-full absolute bottom-0 p-4 bg-[linear-gradient(hsl(0_0%_0%/0),hsl(20_0%_0%/0.3)_20%,hsl(0_0%_0%/1))]">
        <div className="max-h-[10ch] text-lg text-white mb-2">{title}</div>
        <div className="max-h-0  text-sm group-hover:max-h-[14ch] text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(1,0,0,.5)]  delay-100">
        {description}
        </div>
      </div> */}
      </div>
    </article>
  );
}
