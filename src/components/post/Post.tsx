import { getUserAsCreator } from "@/db/users";
import Image from "next/image";
import Link from "next/link";

export default async function Post({
  title,
  description,
  categories = [],
  creatorId,
  date,
  postUrl = "/",
}: {
  title: string;
  description: string;
  categories: string[];
  creatorId: string;
  date: Date;
  postUrl: string;
}) {
  const creator = await getUserAsCreator(creatorId);
  return (
    <article className="@container w-full h-full p-2 rounded-lg border-[1px]">
      <div className="w-full h-full flex flex-col @md:flex-row group relative">
        <Link
          href={postUrl}
          className="h-[12rem] @lg:shrink-0 w-full @md:w-52 mx-auto overflow-clip rounded-lg bg-[#EBEEF3] cursor-pointer"
        >
          <img src={""} alt="" className="object-cover" />
        </Link>
        <div className="flex flex-col gap-2 px-2 flex-1 @md:ml-2 @md:py-2">
          <div className="flex gap-1 mt-2 @md:mt-0 text-xs font-medium text-violet-600 w-fit h-fit">
            {categories.map((category) => (
              <Link href={`/category/${category}`} key={category}>
                <section className=" p-1 bg-violet-100 w-fit rounded-md">
                  {category}
                </section>
              </Link>
            ))}
          </div>
          <Link href={postUrl} className="cursor-pointer">
            <p className="text-lg h-[2ch] font-semibold mb-2 line-clamp-1">
              {title}
            </p>
            <p className="text-sm line-clamp-3">{description}</p>
          </Link>
          <div className="mt-auto pt-2 flex @md:items-start @md:flex-col gap-2 items-center text-xs">
            <Link
              href={`/user/${creator?.id}`}
              className="flex gap-2 items-center"
            >
              <div className="w-8 aspect-square rounded-full overflow-hidden bg-gray-700">
                <Image
                  src={creator?.image!}
                  alt={creator?.name!}
                  className="rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <span className="opacity-75">{creator?.name}</span>
            </Link>
            <span className="ml-auto opacity-75 @md:mt-auto @md:ml-0">
              {date.toLocaleString("default", { month: "long" }) +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
