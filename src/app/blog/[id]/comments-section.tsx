"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment, User } from "@prisma/client";
import { useState } from "react";
import CommentForm from "./comment-form";
import { submitComment } from "./actions";

type CommentType = {
  user: User;
} & Comment;

export default function CommentsSection({
  blogId,
  comments,
}: {
  blogId: string;
  comments: CommentType[];
}) {
  const [commentsList, setCommentsList] = useState(comments);

  async function changeCommentsList(comment: string) {
    const newComment = await submitComment(blogId, comment);
    if (newComment) {
      setCommentsList((old) => [...old, newComment]);
    }
  }
  return (
    <>
      <CommentForm submitComment={changeCommentsList} />
      <Comments comments={commentsList} />
    </>
  );
}

function Comments({ comments }: { comments: CommentType[] }) {
  return (
    <div className="mt-4">
      {comments && (
        <div className="flex flex-col gap-4 text-sm p-4">
          {comments.map((comment) => (
            <article key={comment.id}>
              <div className="flex gap-2 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={comment?.user?.image!}
                    alt={comment?.user?.name!}
                  />
                  <AvatarFallback>
                    {comment?.user?.name
                      ?.split(" ")
                      .map((name) => name.charAt(0))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>{comment.user.name}</div>
              </div>
              <div className="pl-10">{comment.content}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
