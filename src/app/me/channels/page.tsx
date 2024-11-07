import { Button } from "@/components/ui/button";
import { getChannelsByUserId } from "@/db/channels";
import { auth, signIn } from "@/lib/auth";
import Link from "next/link";
import NewChannelForm from "./new-channel-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function MyChannelsPage() {
  const session = await auth();
  if (!session?.user || session.error) await signIn("google");
  const channels = await getChannelsByUserId(session?.user?.id!);

  function createChannelUrl(channelName: string) {
    return channelName.replace(" ", "-").toLowerCase();
  }

  return (
    <div className="max-w-[75rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem]">
      <div className="text-2xl font-semibold">Channels</div>
      <div className="mt-4 px-4 flex flex-col gap-2">
        <NewChannel />
        {channels.map((channel) => (
          <Link key={channel.id} href={`/${createChannelUrl(channel.name)}`}>
            <div className="w-full py-1 px-2 outline-gray-400 outline-1 rounded-lg hover:outline-2 outline-dashed transition-colors ">
              <div className="text-xl">{channel.name}</div>
              <div className="text-gray-500 text-sm">{channel.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NewChannel() {
  return (
    <Dialog>
      <DialogTrigger asChild className="px-0 w-fit">
        <Button variant="link">New Channel +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
          <DialogDescription>Create your own channel.</DialogDescription>
        </DialogHeader>
        <NewChannelForm />
      </DialogContent>
    </Dialog>
  );
}
