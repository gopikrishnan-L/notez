"use server";

import { createComment } from "@/db/comments";
import { auth, signIn } from "@/lib/auth";

export async function submitComment(blogId: string, comment: string) {
  //need to refactor to include authenticated action middleware
  const session = await auth();
  if (session !== null && session.user?.id && !session.error) {
    return await createComment(blogId, session.user.id, comment);
  } else if (session === null || session.error) {
    await signIn("google");
  } else {
    alert("something went wrong");
  }
}
