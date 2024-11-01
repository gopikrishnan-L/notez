"use client";

import { Session } from "next-auth";
import { Bookmark, Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function PostInteraction({
  session,
  likesCount,
  likedByUser,
  bookmarkedByUser,
  onLike,
  onBookmark,
}: {
  session: Session | null;
  likesCount: number;
  likedByUser: boolean;
  bookmarkedByUser: boolean;
  onLike: () => Promise<boolean | null>;
  onBookmark: () => Promise<boolean | null>;
}) {
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(likedByUser);
  const [bookmarked, setBookmarked] = useState(bookmarkedByUser);

  return (
    <div className="flex gap-4 items-center mt-2">
      <div
        className=" group/like flex gap-1 items-center h-8 w-fit py-1 px-2 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
        onClick={
          session?.user
            ? async () => {
                const updatedLike = await onLike();
                if (updatedLike != null) {
                  if (updatedLike === true) {
                    setLikes(likes + 1);
                  } else if (updatedLike === false) {
                    //already liked so dislike
                    setLikes(likes - 1);
                  }
                  setLiked(updatedLike);
                } else {
                  console.log("not signed in like");
                  await signIn("google");
                }
              }
            : async () => {
                console.log("not signed in");
                await signIn("google");
              }
        }
      >
        <div
          className={`flex items-end tabular-nums ${
            liked ? "text-red-500" : "text-black"
          } select-none`}
        >
          {likes}
        </div>
        <Heart
          className={`h-5 w-5 group-hover/like:stroke-red-500 ${
            liked ? "fill-red-500 stroke-red-500" : "fill-none"
          }`}
        />
      </div>
      <div
        className="flex items-center h-8 w-fit py-1 px-2 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
        onClick={
          session?.user
            ? async () => {
                const updatedBookmark = await onBookmark();
                if (updatedBookmark != null) {
                  setBookmarked(updatedBookmark);
                } else {
                  console.log("not signed in");
                  await signIn("google");
                }
              }
            : async () => {
                console.log("not signed in");
                await signIn("google");
              }
        }
      >
        <Bookmark
          className={`h-5 w-5 ${
            bookmarked ? "fill-orange-400 stroke-orange-400" : "fill-none"
          }`}
        />
      </div>
    </div>
  );
}
