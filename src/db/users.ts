import prisma from "@/lib/db";

export async function getUser(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getUserAsCreator(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true,name: true,  image: true },
  });
}
