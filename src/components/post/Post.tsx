import { getUserAsCreator } from "@/db/users";
import { auth } from "@/lib/auth";
import Link from "next/link";
import PostInteraction from "./PostInteraction";
import { Blog } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import CustomImage from "../CustomImage";

export default async function Post({ blog }: { blog: Blog }) {
  const session = await auth();
  const creator = await getUserAsCreator(blog.creatorId);

  const postUrl = `/blog/${blog.id}`;

  return (
    <article className="@container w-full h-full p-2 rounded-lg border-[1px]">
      <div className="w-full h-full flex flex-col @md:flex-row group relative">
        <Link href={postUrl}>
          <div className="relative grid place-content-center h-[12rem] @md:h-full @lg:shrink-0 w-full @md:w-52 mx-auto overflow-clip rounded-lg bg-secondary cursor-pointer">
            {blog.image ? (
              <CustomImage url={blog.image} alt={blog.title} />
            ) : (
              <ImageOff size="2em" />
            )}
          </div>
        </Link>
        <div className="flex flex-col gap-2 px-2 flex-1 @md:ml-2 @md:pt-2">
          <div className="flex gap-1 mt-2 @md:mt-0 text-xs font-medium text-violet-600 w-fit h-fit">
            {blog.categories.map((category) => (
              <Link href={`/category/${category}`} key={category}>
                <section className=" p-1 bg-violet-100 w-fit rounded-md">
                  {category}
                </section>
              </Link>
            ))}
          </div>
          <Link href={postUrl} className="cursor-pointer">
            <p className="text-lg h-[2ch] font-semibold mb-2 line-clamp-1">
              {blog.title}
            </p>
            <p className="text-sm line-clamp-3">{blog.description}</p>
          </Link>
          <div className="w-full flex flex-col gap-2 justify-between">
            <div className="mt-auto flex @md:items-start @md:flex-col gap12 items-center text-xs">
              <Link
                href={`/user/${creator?.id}`}
                className="flex gap-2 items-center"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={creator?.image!} alt={creator?.name!} />
                  <AvatarFallback>
                    {creator?.name
                      ?.split(" ")
                      .map((name) => name.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="opacity-75">{creator?.name}</span>
              </Link>
              <span className="ml-auto opacity-75 @md:mt-auto @md:ml-0">
                {blog.createdAt.toLocaleString("default", { month: "long" }) +
                  " " +
                  blog.createdAt.getDate() +
                  ", " +
                  blog.createdAt.getFullYear()}
              </span>
            </div>
            <div>
              <PostInteraction blogId={blog.id} session={session} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
