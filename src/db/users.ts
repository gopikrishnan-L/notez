import prisma from "@/lib/db";

export async function getUserById(
  id: string,
  options: { profileFlag?: boolean; blogsFlag?: boolean } = {}
) {
  const { profileFlag = false, blogsFlag = false } = options;
  return await prisma.user.findUnique({
    where: { id },
    include: { profile: profileFlag, blogs: blogsFlag },
  });
}

export async function getUserAsCreator(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, image: true },
  });
}
