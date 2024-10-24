"use client";

import { Session } from "next-auth";
import { Bookmark, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function PostInteraction({
  session,
  likesCount,
  likedByUser,
  bookmarkedByUser,
  onLike,
  onBookmark,
}: {
  session: Session | null;
  id: string;
  creatorId: string;
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
    <div className="flex gap-2 items-end h-full">
      <div className="flex gap-1">
        <div className="text-black select-none">{likes}</div>
        <ThumbsUp
          className={`hover:scale-110 transition-transform cursor-pointer ${
            liked ? "fill-yellow-400 stroke-yellow-400" : "fill-none"
          }`}
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
                    console.log("not signed in");
                  }
                }
              : () => {
                  console.log("not signed in");
                }
          }
        />
      </div>
      <div className="flex gap-1">
        <Bookmark
          className={`hover:scale-110 transition-transform cursor-pointer ${
            bookmarked ? "fill-orange-400 stroke-orange-400" : "fill-none"
          }`}
          onClick={
            session?.user
              ? async () => {
                  const updatedBookmark = await onBookmark();
                  if (updatedBookmark != null) {
                    setBookmarked(updatedBookmark);
                  } else {
                    console.log("not signed in");
                  }
                }
              : () => {
                  console.log("not signed in");
                }
          }
        />
      </div>
    </div>
  );
}
