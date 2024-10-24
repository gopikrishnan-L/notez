"use client";

import { Session } from "next-auth";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function PostInteraction({
  session,
  likesCount,
  onLike,
  likedByUser,
}: {
  session: Session | null;
  id: string;
  creatorId: string;
  likesCount: number;
  likedByUser: boolean;
  onLike: () => Promise<boolean>;
}) {
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(likedByUser);
  return (
    <div className="flex gap-1 items-end h-fit">
      <div className="text-black select-none">{likes}</div>
      <ThumbsUp
        className={`pointer hover:scale-110 transition-transform  ${
          liked ? "fill-yellow-400 stroke-yellow-400" : "fill-none"
        }`}
        onClick={
          session?.user
            ? async () => {
                const updatedLike = await onLike();
                if (updatedLike) {
                  setLikes(likes + 1);
                } else {
                  //already liked so dislike
                  setLikes(likes - 1);
                }
                setLiked(updatedLike);
              }
            : () => {
                console.log("not signed in");
              }
        }
      />
    </div>
  );
}
