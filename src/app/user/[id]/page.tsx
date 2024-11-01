import Post from "@/components/post/Post";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById } from "@/db/users";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id, {
    includeProfile: true,
    includeBlogs: true,
  });
  return (
    <div className="grid grid-cols-[3fr_1fr] gap-4 max-w-[75rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem]">
      <div className="h-full w-full">
        <h2 className="text-xl font-medium mb-4 p-2">{user?.name}'s Profile</h2>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="likes">Liked Blogs</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-1 gap-2 max-lg:w-full">
              {user?.blogs &&
                user?.blogs.map((blog) => <Post key={blog.id} blog={blog} />)}
            </div>
          </TabsContent>
          <TabsContent value="likes">
            <div className="grid max-lg:w-full gap-2">
              {user?.likedBlogs &&
                user?.likedBlogs.map((blog) => (
                  <Post key={blog.id} blog={blog} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="bookmarks">
            <div className="grid max-lg:w-full gap-2">
              {user?.bookmarkedBlogs &&
                user?.bookmarkedBlogs.map((blog) => (
                  <Post key={blog.id} blog={blog} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {user && (
        <div className="border-l-[1px] px-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((name) => name.charAt(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-md font-medium">{user?.name}</h3>
          {user.profile && (
            <section className="mt-4 opacity-75">{user.profile.bio}</section>
          )}
        </div>
      )}
    </div>
  );
}
