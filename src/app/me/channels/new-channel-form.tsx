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
import { newChannelSchema } from "./schema";
import { useState } from "react";
import { ImageUp, Paperclip } from "lucide-react";

export default function NewChannelForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof newChannelSchema>>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newChannelSchema>) {
    if (values?.avatarImage?.[0] instanceof File) {
      const formData = new FormData();
      const avatar = values.avatarImage?.[0];
      formData.set("avatar", avatar);
      await submitNewChannel(values?.name, values?.description, formData);
    }
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
          <div className="flex gap-4">
            {selectedImage ? (
              <div className="md:max-w-[200px]">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-between">
                <div className="p-3 bg-slate-200  justify-center items-center flex">
                  <ImageUp size={56} />
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="avatarImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                      />
                      <label
                        htmlFor="fileInput"
                        className="p-2 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                      >
                        <Paperclip />
                        choose avatar image
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an avatar image to be displayed for your channel.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
