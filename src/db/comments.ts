import prisma from "@/lib/db";

export async function getCommentsByBlogId(blogId: string) {
  return await prisma.comment.findMany({
    where: { blogId },
    include: { user: true },
  });
}
