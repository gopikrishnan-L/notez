import CustomImage from "@/components/CustomImage";
import Post from "@/components/post/Post";
import { getChannelByName } from "@/db/channels";
import { ImageOff } from "lucide-react";

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  const channelName = params.channel.replace("-", " ");
  const channel = await getChannelByName(channelName, { includeBlogs: true });
  if (!channel) return <div> No such channel exists</div>;
  return (
    <div className="max-w-[75rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem] max-lg:grid-cols-1">
      <div className="relative w-full h-fit rounded-lg">
        <div className="grid place-content-center w-full h-52 rounded-lg bg-secondary overflow-clip">
          {channel.backgroundImage ? (
            <CustomImage url={channel.backgroundImage} alt={channel.name} />
          ) : (
            <ImageOff size="2em" />
          )}
        </div>
        <div className="absolute w-fit h-32 -bottom-16 left-5 flex gap-4">
          <div className="grid place-content-center w-32 aspect-square rounded-full border-2 bg-secondary overflow-clip">
            {channel.avatar ? (
              <CustomImage url={channel.avatar} alt={channel.name} />
            ) : (
              <ImageOff size="2em" />
            )}
          </div>
          <div className="self-end border-red-400 w-fit h-1/2">
            <div className="text-2xl font-semibold">{channel.name}</div>
            <div className="text-lg font-light">{channel.description}</div>
          </div>
        </div>
      </div>
      <section className="mt-24">
        <div className="text-lg">Latest Blog Posts</div>
        <div className="mt-2 grid grid-cols-1 gap-2 max-lg:w-full lg:row-start-2">
          {channel.blogs.map((blog, i) => (
            <Post key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
