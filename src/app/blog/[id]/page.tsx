import { getBlogById } from "@/db/blogs";
import { getCommentsByBlogId } from "@/db/comments";
import { getUserAsCreator } from "@/db/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id);
  let creator;
  if (blog) {
    creator = await getUserAsCreator(blog?.creatorId);
  }

  return (
    <div className="max-w-[60rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem]">
      <div className="w-full h-full flex flex-col">
        <h2 className="text-4xl font-bold">{blog?.title}</h2>
        <h3 className="text-2xl mt-4 font-light">{blog?.description}</h3>
        <section className="flex mt-8 gap-2 pt-2 items-center w-fit">
          <Link href={`/user/${creator?.id}`}>
            <Avatar>
              <AvatarImage src={creator?.image!} alt={creator?.name!} />
              <AvatarFallback>
                {creator?.name
                  ?.split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col gap-1">
            <Link href={`/user/${creator?.id}`}>
              <span className="text-sm">{creator?.name}</span>
            </Link>
            <span className="ml-auto text-xs opacity-75">
              {blog?.createdAt.toLocaleString("default", { month: "long" }) +
                " " +
                blog?.createdAt.getDate() +
                ", " +
                blog?.createdAt.getFullYear()}
            </span>
          </div>
        </section>
        <article className="text-pretty text-lg w-full mt-8 mx-auto">
          {blog?.content}
        </article>
      </div>
      <Comments blogId={blog?.id!} />
    </div>
  );
}

async function Comments({ blogId }: { blogId: string }) {
  const comments = await getCommentsByBlogId(blogId);

  return (
    <div className="mt-4">
      <div className="text-xl font-semibold">Comments</div>
      {comments && (
        <div className="flex flex-col gap-4 text-sm p-4">
          {comments.map((comment) => (
            <article key={comment.id}>
              <div className="flex gap-2 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment?.user?.image!}
                    alt={comment?.user?.name!}
                  />
                  <AvatarFallback>
                    {comment?.user?.name
                      ?.split(" ")
                      .map((name) => name.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {/* <div className="h-8 aspect-square overflow-hidden rounded-full">
                  <Image
                    src={comment.user.image!}
                    alt={comment.user.name!}
                    height={40}
                    width={40}
                  />
                </div> */}
                <div>{comment.user.name}</div>
              </div>
              <div className="pl-10">{comment.content}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
