"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { submitNewChannel } from "./actions";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Channel name must have at least 3 characters.",
  }),
  description: z.string().min(5, {
    message: "Channel description must have at least 5 characters.",
  }),
});

export default function NewChannelForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await submitNewChannel(values.name, values.description);
    router.refresh();
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add channel name"
                    className="focus-visible:outline-blue-600 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the public name of the channel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Channel description"
                    className="focus-visible:outline-blue-600 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A short introduction to your channel to let the readers know
                  what it is about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <DialogClose asChild>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
}
