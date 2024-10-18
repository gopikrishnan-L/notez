import Post from "@/components/post/Post";
import { getUserById } from "@/db/users";
import Image from "next/image";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id, {
    profileFlag: true,
    blogsFlag: true,
  });
  return (
    <div className="grid grid-cols-[3fr_1fr] gap-4 max-w-[75rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem]">
      <div className="h-full w-full">
        <h2 className="text-xl font-medium mb-4 p-2">
          {user?.name}'s Blogposts
        </h2>
        <div className="grid grid-cols-3 gap-2 max-lg:w-full">
          {user?.blogs &&
            user?.blogs.map((blog) => (
              <Post
                key={blog.id}
                title={blog.title}
                description={blog.description}
                categories={blog.categories}
                creatorId={blog.creatorId}
                date={blog.createdAt}
                postUrl={`/blog/${blog.id}`}
              />
            ))}
        </div>
      </div>
      {user && (
        <div className="border-l-[1px] px-8">
          <div className="h-20 aspect-square overflow-hidden rounded-full">
            <Image
              src={user?.image!}
              alt={user?.name!}
              width={80}
              height={80}
            />
          </div>
          <h3 className="mt-4 text-md font-medium">{user?.name}</h3>
          {user.profile && (
            <section className="mt-4 opacity-75">{user.profile.bio}</section>
          )}
        </div>
      )}
    </div>
  );
}
