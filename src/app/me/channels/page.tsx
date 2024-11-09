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
import Image from "next/image";
import { ImageOff } from "lucide-react";
import CustomImage from "@/components/CustomImage";

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
            <div className="flex gap-2 h-fit w-full py-1 px-2 outline-gray-400 outline-1 rounded-lg hover:outline-2 outline-dashed transition-colors ">
              <div className="relative grid place-content-center shrink-0 self-center h-[2rem] w-[4rem] max-w-[6rem] bg-[#EBEEF3] rounded-lg overflow-clip">
                {channel.avatar ? (
                  <CustomImage url={channel.avatar} alt={channel.name} />
                ) : (
                  <ImageOff size="1em" />
                )}
              </div>
              <div>
                <div className="text-xl">{channel.name}</div>
                <div className="text-gray-500 text-sm">
                  {channel.description}
                </div>
              </div>
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
      <DialogTrigger asChild className="w-fit">
        <Button variant="link">New Channel +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
          <DialogDescription>Create your own channel.</DialogDescription>
        </DialogHeader>
        <NewChannelForm />
      </DialogContent>
    </Dialog>
  );
}
