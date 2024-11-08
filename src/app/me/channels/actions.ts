"use server";

import { createChannel } from "@/db/channels";
import { auth, signIn } from "@/lib/auth";
import utapi from "@/lib/uploadthing";

export async function submitNewChannel(
  name: string,
  description: string,
  avatarForm: any
) {
  //need to refactor to include authenticated action middleware
  const session = await auth();
  const avatarImage = avatarForm.get("avatar");
  if (session?.user?.id && !session.error) {
    const avatarRes = await utapi.uploadFiles(avatarImage);
    return await createChannel(
      session.user.id,
      name,
      description,
      avatarRes.data?.url
    );
  } else {
    await signIn("google");
  }
}
