"use server";

import { toggleBookmark, toggleLike } from "@/db/blogs";
import { auth, signIn } from "@/lib/auth";

export const onLike = async (blogId: string) => {
  const session = await auth();
  try {
    if (session?.user?.id) {
      const updatedLike = await toggleLike(blogId, session?.user?.id!);
      return updatedLike;
    } else {
      await signIn("google");
    }
  } catch (e) {
    console.log(e);
  }
};
export const onBookmark = async (blogId: string) => {
  const session = await auth();
  try {
    if (session?.user?.id) {
      const updatedBookmark = await toggleBookmark(blogId, session?.user?.id);
      return updatedBookmark;
    } else {
      await signIn("google");
    }
  } catch (e) {
    console.log(e);
  }
};
