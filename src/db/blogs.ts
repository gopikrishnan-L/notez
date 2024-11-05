import prisma from "@/lib/db";

export async function getAllBlogs() {
  return await prisma.blog.findMany({
    // include: { likedBy: true, bookmarkedBy: true },
  });
}

export async function getBlogById(id: string) {
  return await prisma.blog.findUnique({
    where: { id },
    // include: { likedBy: true, bookmarkedBy: true },
  });
}

export async function getBlogByCategories(category: string[]) {
  return await prisma.blog.findMany({
    where: { categories: { hasEvery: [...category] } },
    // include: { likedBy: true, bookmarkedBy: true },
  });
}

export async function getBlogsByUserId(userId: string) {
  return await prisma.blog.findMany({
    where: {
      creatorId: userId,
    },
    // include: { likedBy: true, bookmarkedBy: true },
  });
}

export async function getBlogInteractions(id: string) {
  return await prisma.blog.findUnique({
    where: { id },
    select: {
      likesCount: true,
      likedBy: true,
      bookmarkedBy: true,
    },
  });
}

export async function toggleLike(id: string, userId: string) {
  const alreadyLiked = await prisma.blog.findFirst({
    where: { id, likedBy: { some: { id: userId } } },
  });

  if (alreadyLiked) {
    await prisma.blog.update({
      where: { id },
      data: {
        likesCount: { decrement: 1 },
        likedBy: { disconnect: { id: userId } },
      },
    });
    // console.log("user unliked");
    return false;
  }

  await prisma.blog.update({
    where: { id },
    data: {
      likesCount: { increment: 1 },
      likedBy: { connect: { id: userId } },
    },
  });

  //console.log("user liked")
  return true;
}

export async function toggleBookmark(id: string, userId: string) {
  const alreadyBookmarked = await prisma.blog.findFirst({
    where: { id, bookmarkedBy: { some: { id: userId } } },
  });

  if (alreadyBookmarked) {
    await prisma.blog.update({
      where: { id },
      data: {
        bookmarkedBy: { disconnect: { id: userId } },
      },
    });
    // console.log("user unbookmarked");
    return false;
  }

  await prisma.blog.update({
    where: { id },
    data: {
      bookmarkedBy: { connect: { id: userId } },
    },
  });

  //console.log("user bookmarked")
  return true;
}
