import prisma from "@/lib/db";

export async function getUserById(
  id: string,
  options: { includeProfile?: boolean; includeBlogs?: boolean } = {}
) {
  const { includeProfile = false, includeBlogs = false } = options;
  return await prisma.user.findUnique({
    where: { id },
    include: {
      profile: includeProfile,
      blogs: {
        include: {
          likedBy: includeBlogs,
          bookmarkedBy: includeBlogs,
        },
      },
      likedBlogs: {
        include: {
          likedBy: includeBlogs,
          bookmarkedBy: includeBlogs,
        },
      },
      bookmarkedBlogs: {
        include: {
          likedBy: includeBlogs,
          bookmarkedBy: includeBlogs,
        },
      },
    },
  });
}

export async function getUserAsCreator(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, image: true },
  });
}
