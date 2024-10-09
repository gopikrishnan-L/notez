// "use client";

// import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-[3fr_1fr] w-3/4 mx-auto gap-4 ">
      <HighLights />
      <div className="w-full h-full text-lg font-semibold">Editors' Picks</div>
      <div className="flex flex-col gap-8 row-start-2 w-[85%]">
        <Post />
        <Post />
        <Post />
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

function Post() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full h-16 rounded-t-lg bg-black"></div>
      <div className="text-xl font-medium">
        Random blog post made by the best player in the world
      </div>
      <div className="mt-2">Some random description about the post</div>
    </div>
  );
}
