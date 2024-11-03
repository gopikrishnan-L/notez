import { getCommentsByBlogId } from "@/db/comments";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const blogId = (await params).blogId;
  const comments = await getCommentsByBlogId(blogId);
  return Response.json(comments);
}
