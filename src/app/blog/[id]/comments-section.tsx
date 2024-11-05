"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment, User } from "@prisma/client";
import CommentForm from "./comment-form";
import { submitComment } from "./actions";
import useSWR from "swr";

type CommentType = {
  user: User;
  meow: string;
} & Comment;

const commentsFetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

export default function CommentsSection({ blogId }: { blogId: string }) {
  const {
    data: comments,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/blog/${blogId}/comments`, commentsFetcher);

  async function changeCommentsList(comment: string) {
    const newComment = await submitComment(blogId, comment);
    if (newComment) {
      mutate();
    }
  }
  return (
    <>
      <CommentForm submitComment={changeCommentsList} />
      <div className="mt-4">
        {error && <div>{error}</div>}
        <div className="flex flex-col gap-4 text-sm p-4">
          {isLoading && <div>loading comments...</div>}
          {comments &&
            comments.map((comment: CommentType) => (
              <UserComment comment={comment} />
            ))}
        </div>
      </div>
    </>
  );
}

function UserComment({ comment }: { comment: CommentType }) {
  return (
    <article key={comment.id}>
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment?.user?.image!} alt={comment?.user?.name!} />
          <AvatarFallback>
            {comment?.user?.name
              ?.split(" ")
              .map((name: string) => name.charAt(0))
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>{comment.user.name}</div>
      </div>
      <div className="pl-10">{comment.content}</div>
    </article>
  );
}
