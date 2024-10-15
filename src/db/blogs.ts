import prisma from "@/lib/db";

export async function getAllBlogs() {
  return await prisma.blog.findMany();
}

export async function getBlogById(blogId: string) {
  return await prisma.blog.findUnique({ where: { id: blogId } });
}

export async function getBlogsByUserId(userId: string) {
  return await prisma.blog.findMany({
    where: {
      creatorId: userId,
    },
  });
}
