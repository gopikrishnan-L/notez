import { getBlogInteractions } from "@/db/blogs";
import { auth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  const session = await auth();
  const blogId = params.blogId;
  const blogInteractions = await getBlogInteractions(blogId);

  const likedByUser = blogInteractions?.likedBy?.some(
    (liker) => liker.id === session?.user?.id
  );
  const bookmarkedByUser = blogInteractions?.bookmarkedBy?.some(
    (bookmarker) => bookmarker.id === session?.user?.id
  );
  return Response.json({
    likesCount: blogInteractions?.likesCount,
    likedByUser,
    bookmarkedByUser,
  });
}
