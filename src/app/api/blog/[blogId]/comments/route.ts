import { getCommentsByBlogId } from "@/db/comments";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  const blogId = params.blogId;
  const comments = await getCommentsByBlogId(blogId);
  return Response.json(comments);
}
