import { getUserAsCreator, getUserById } from "@/db/users";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { toggleBookmark, toggleLike } from "@/db/blogs";
import PostInteraction from "./PostInteraction";
import { Blog, User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function Post({
  blog,
}: {
  blog: { likedBy: User[]; bookmarkedBy: User[] } & Blog;
}) {
  const session = await auth();
  const creator = await getUserAsCreator(blog.creatorId);

  const postUrl = `/blog/${blog.id}`;
  const likedByUser = blog.likedBy.some(
    (liker) => liker.id === session?.user?.id
  );
  const bookmarkedByUser = blog.bookmarkedBy.some(
    (bookmarker) => bookmarker.id === session?.user?.id
  );

  const onLike = async () => {
    "use server";
    if (session?.user?.id) {
      const updatedLike = await toggleLike(blog.id, session?.user?.id);
      return updatedLike;
    } else {
      return null;
    }
  };
  const onBookmark = async () => {
    "use server";
    if (session?.user?.id) {
      const updatedBookmark = await toggleBookmark(blog.id, session?.user?.id);
      return updatedBookmark;
    } else {
      return null;
    }
  };

  return (
    <article className="@container w-full h-full p-2 rounded-lg border-[1px]">
      <div className="w-full h-full flex flex-col @md:flex-row group relative">
        <Link
          href={postUrl}
          className="h-[12rem] @md:h-full @lg:shrink-0 w-full @md:w-52 mx-auto overflow-clip rounded-lg bg-[#EBEEF3] cursor-pointer"
        >
          <img src={""} alt="" className="object-cover" />
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
              <PostInteraction
                session={session}
                likesCount={blog.likesCount}
                likedByUser={likedByUser}
                bookmarkedByUser={bookmarkedByUser}
                onLike={onLike}
                onBookmark={onBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
