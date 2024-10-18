import prisma from "@/lib/db";

export async function getAllBlogs() {
  return await prisma.blog.findMany();
}

export async function getBlogById(id: string) {
  return await prisma.blog.findUnique({ where: { id } });
}

export async function getBlogByCategories(category: string[]) {
  return await prisma.blog.findMany({
    where: { categories: { hasEvery: [...category] } },
  });
}

export async function getBlogsByUserId(userId: string) {
  return await prisma.blog.findMany({
    where: {
      creatorId: userId,
    },
  });
}
