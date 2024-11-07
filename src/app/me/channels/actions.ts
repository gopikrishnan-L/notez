"use server";

import { createChannel } from "@/db/channels";
import { createComment } from "@/db/comments";
import { auth, signIn } from "@/lib/auth";

export async function submitNewChannel(name: string, description: string) {
  //need to refactor to include authenticated action middleware
  const session = await auth();
  if (session?.user?.id && !session.error) {
    return await createChannel(session.user.id, name, description);
  } else {
    await signIn("google");
  }
}
