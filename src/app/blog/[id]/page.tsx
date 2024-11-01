import { getBlogById } from "@/db/blogs";
import { createComment, getCommentsByBlogId } from "@/db/comments";
import { getUserAsCreator } from "@/db/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";
import CommentsSection from "./comments-section";

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
      <div className="text-xl font-semibold mt-12">Comments</div>
      <CommentsSectionWrapper blogId={blog?.id!} />
    </div>
  );
}

async function CommentsSectionWrapper({ blogId }: { blogId: string }) {
  const comments = await getCommentsByBlogId(blogId);

  return <CommentsSection comments={comments} blogId={blogId} />;
}
