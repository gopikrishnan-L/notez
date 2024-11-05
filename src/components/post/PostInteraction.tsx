"use client";

import { Session } from "next-auth";
import { Bookmark, Heart, ThumbsUp } from "lucide-react";
import { signIn } from "next-auth/react";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { onBookmark, onLike } from "./actions";

const blogInteractionsFetcher = (
  url: string
): Promise<{
  likesCount: number;
  likedByUser: boolean;
  bookmarkedByUser: boolean;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export default function PostInteraction({
  blogId,
  session,
}: {
  blogId: string;
  session: Session | null;
}) {
  const {
    data: interactions,
    isLoading,
    mutate,
  } = useSWR(`/api/blog/${blogId}/interactions`, blogInteractionsFetcher);

  async function likeMutator() {
    const liked = await onLike(blogId);
    if (interactions) {
      return {
        likesCount: liked
          ? interactions?.likesCount + 1
          : interactions?.likesCount - 1,
        likedByUser: liked ? true : false,
        bookmarkedByUser: interactions?.bookmarkedByUser,
      };
    }
  }

  async function bookmarkMutator() {
    const bookmarked = await onBookmark(blogId);
    if (interactions) {
      return {
        likesCount: interactions?.likesCount,
        likedByUser: interactions?.likedByUser,
        bookmarkedByUser: bookmarked ? true : false,
      };
    }
  }

  const likeMutateOptions = (likesCount: number, likedByUser: boolean) => ({
    optimisticData: {
      likesCount: !likedByUser ? likesCount + 1 : likesCount - 1,
      likedByUser: !likedByUser,
      bookmarkedByUser: interactions?.bookmarkedByUser!,
    },
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  });

  const bookmarkMutateOptions = (bookmarkedByUser: boolean) => {
    return {
      optimisticData: {
        likesCount: interactions?.likesCount!,
        likedByUser: interactions?.likedByUser!,
        bookmarkedByUser: !bookmarkedByUser,
      },
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    };
  };

  if (isLoading) return <Skeleton className="h-8 w-32 mt-2" />;

  return (
    <div className="flex gap-4 items-center mt-2">
      <div
        className=" group/like flex gap-1 items-center h-8 w-fit py-1 px-2 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
        onClick={
          session?.user
            ? async () => {
                if (interactions) {
                  await mutate(
                    likeMutator(),
                    likeMutateOptions(
                      interactions.likesCount,
                      interactions.likedByUser
                    )
                  );
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
            interactions?.likedByUser ? "text-red-500" : "text-black"
          } select-none`}
        >
          {interactions?.likesCount}
        </div>
        <Heart
          className={`h-5 w-5 group-hover/like:stroke-red-500 ${
            interactions?.likedByUser
              ? "fill-red-500 stroke-red-500"
              : "fill-none"
          }`}
        />
      </div>
      <div
        className="flex items-center h-8 w-fit py-1 px-2 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
        onClick={
          session?.user
            ? async () => {
                if (interactions) {
                  await mutate(
                    bookmarkMutator(),
                    bookmarkMutateOptions(interactions.bookmarkedByUser)
                  );
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
            interactions?.bookmarkedByUser
              ? "fill-orange-400 stroke-orange-400"
              : "fill-none"
          }`}
        />
      </div>
    </div>
  );
}
