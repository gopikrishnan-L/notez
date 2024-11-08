import prisma from "@/lib/db";
import { inspect } from "util";

export async function getChannelByName(
  name: string,
  options: { includeBlogs?: boolean } = {}
) {
  const { includeBlogs = false } = options;
  return await prisma.channel.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    include: { blogs: includeBlogs },
  });
}

export async function getChannelsByUserId(userId: string) {
  return await prisma.channel.findMany({
    where: { OR: [{ adminId: userId }, { users: { some: { id: userId } } }] },
  });
}

export async function createChannel(
  adminId: string,
  name: string,
  description: string,
  avatarUrl?: string,
  bgImageUrl?: string
) {
  return await prisma.channel.create({
    data: {
      name,
      description,
      adminId,
      avatar: avatarUrl,
      backgroundImage: bgImageUrl,
    },
  });
}
