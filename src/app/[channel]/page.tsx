import { getChannelByName } from "@/db/channels";
import prisma from "@/lib/db";
import { channel } from "diagnostics_channel";

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  const channelName = params.channel.replace("-", " ").toLowerCase();
  const channel = await getChannelByName(channelName, { includeBlogs: true });
  if (!channel) return <div> No such channel exists</div>;
  return <div>{JSON.stringify(channel)}</div>;
}
