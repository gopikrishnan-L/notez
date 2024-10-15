import { getUserAsCreator } from "@/db/users";
import Link from "next/link";

export default async function Post({
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
            <Link
              href={`/users/${creator?.id}`}
              className="flex gap-2 items-center"
            >
              <div className="w-8 aspect-square rounded-full overflow-hidden bg-gray-700">
                <img src={creator?.image!} alt={creator?.name!} />
              </div>
              <span className="opacity-75">{creator?.name}</span>
            </Link>
            <span className="ml-auto opacity-75">
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
