import prisma from "@/lib/db";

export async function getChannelByName(
  name: string,
  options: { includeBlogs?: boolean } = {}
) {
  const { includeBlogs = false } = options;
  return await prisma.channel.findFirst({
    where: { name },
    include: { blogs: includeBlogs },
  });
}
