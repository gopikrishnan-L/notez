import prisma from "@/lib/db";

export async function getCommentsByBlogId(blogId: string) {
  const comments = await prisma.comment.findMany({
    where: { blogId },
    include: { user: true },
  });
  return comments;
}

export async function createComment(
  blogId: string,
  userId: string,
  comment: string
) {
  return await prisma.comment.create({
    data: {
      blogId,
      userId,
      content: comment,
    },
    include: {
      user: true,
    },
  });
}
export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id },
  });
}
