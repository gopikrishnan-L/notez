"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment, User } from "@prisma/client";
import CommentForm from "./comment-form";
import { submitComment, deleteCommentAction } from "./actions";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Flag, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

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

  async function onCommentDelete(commentId: number, userId: string) {
    const deletedComment = await deleteCommentAction(commentId, userId);
    if (deletedComment) {
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
              <UserComment
                key={comment.id}
                comment={comment}
                onDelete={onCommentDelete}
              />
            ))}
        </div>
      </div>
    </>
  );
}

function UserComment({
  comment,
  onDelete,
}: {
  comment: CommentType;
  onDelete: (commentId: number, userId: string) => Promise<void>;
}) {
  const { data: session } = useSession();

  return (
    <article className="relative">
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
        <div className="opacity-70">{comment.user.name}</div>
      </div>
      <div className="pl-10">{comment.content}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute right-0 top-2 hover:bg-secondary cursor-pointer rounded-full p-2">
            <EllipsisVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          {session?.user?.id === comment.userId && (
            <DropdownMenuItem
              onClick={async () => {
                await onDelete(comment.id, comment.userId);
              }}
            >
              <Trash className="mr-4 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={async () => {
              await onDelete(comment.id, comment.userId);
            }}
          >
            <Flag className="mr-4 h-4 w-4" />
            <span>Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}
